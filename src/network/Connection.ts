import type { Buffer } from 'node:buffer';
import type { Cipher, Decipher } from 'node:crypto';
import type { Socket } from 'node:net';
import { deflateSync, inflateSync } from 'node:zlib';
import type BarrierTs from '../BarrierTs';
import Chat, { ChatType } from '../types/classes/Chat';
import UUID from '../types/classes/UUID';
import { ChatPermission } from '../types/enums/ChatPermission';
import { GameType } from '../types/enums/GameType';
import DataBuffer from './DataBuffer';
import GamePacketListener from './GamePacketListener';
import LoginPacketListener from './LoginPacketListener';
import type PacketListener from './PacketListener';
import type ClientBoundPacket from './protocol/ClientBoundPacket';
import { ConnectionProtocol } from './protocol/ConnectionProtocol';
import ClientBoundChatPacket from './protocol/game/ClientBoundChatPacket';
import ClientBoundDisconnectPacket from './protocol/game/ClientBoundDisconnectPacket';
import ClientBoundPlayerInfoPacket, { Action } from './protocol/game/ClientBoundPlayerInfoPacket';
import ClientBoundRemoveEntitiesPacket from './protocol/game/ClientBoundRemoveEntitiesPacket';
import ClientBoundLoginCompressionPacket from './protocol/login/ClientBoundLoginCompressionPacket';
import ClientBoundLoginDisconnectPacket from './protocol/login/ClientBoundLoginDisconnectPacket';

export default class Connection {
    private encryption: Cipher | null = null;
    private decryption: Decipher | null = null;
    private compression = false;
    private protocol = ConnectionProtocol.HANDSHAKING;
    private listener!: PacketListener;
    private packetQueue: DataBuffer[] = [];

    public constructor(private readonly networking: Socket, private readonly server: BarrierTs) {
        this.networking.on('data', (data: Buffer): void => {
            const inData = new DataBuffer(this.decryption ? this.decryption.update(data) : data);
            if (this.compression) {
                do {
                    const packetLength = inData.readVarInt();
                    const packetDataRaw = new DataBuffer(inData.getReadableBytes().buffer.slice(0, packetLength));
                    const dataLength = packetDataRaw.readVarInt();
                    const packetData = new DataBuffer(dataLength > 0 ? inflateSync(packetDataRaw.getReadableBytes().buffer) : packetDataRaw.getReadableBytes().buffer);
                    const packetId = packetData.readVarInt();
                    inData.addOffset(packetLength);
                    const packet = server.protocol.getPacket(this.protocolState, packetId);
                    if (!packet) return server.console.error(`Can not find packet ${packetId} for state ${this.protocolState}!`);
                    const dataPacket = new packet(packetData);
                    try {
                        dataPacket.handle(this.listener);
                    } catch (error) {
                        server.console.error(`Failed to handle ${packet.name} because ${error}!`);
                    }
                } while (inData.getReadableBytes().buffer.length > 0);
                return;
            }

            do {
                const packetLength = inData.readVarInt();
                const packetData = new DataBuffer(inData.getReadableBytes().buffer.slice(0, packetLength));
                const packetId = packetData.readVarInt();
                inData.addOffset(packetLength);
                const packet = server.protocol.getPacket(this.protocolState, packetId);
                if (!packet) return server.console.error(`Can not find packet ${packetId} for state ${this.protocolState}`);
                const dataPacket = new packet(packetData);
                try {
                    dataPacket.handle(this.listener);
                } catch (error) {
                    server.console.error(`Failed to handle ${packet.name} because ${error}!`);
                }
            } while (inData.getReadableBytes().buffer.length > 0);
        });

        this.networking.on('close', () => {
            this.server.playerManager.savePlayer(this);
            const player = this.server.playerManager.players.get(this);
            this.server.playerManager.players.delete(this);
            this.server.playerManager.connections.delete(this);
            if (!player) return;
            this.server.playerManager.sendAll(new ClientBoundRemoveEntitiesPacket([player.id]));
            this.server.playerManager.sendAll(
                new ClientBoundPlayerInfoPacket(Action.REMOVE_PLAYER, [
                    {
                        latency: 0,
                        gameMode: GameType.CREATIVE,
                        profile: player.gameProfile,
                        displayName: new Chat(ChatType.TEXT, player.gameProfile.name),
                    },
                ]),
            );
            this.server.playerManager.sendAll(
                new ClientBoundChatPacket(
                    new Chat(ChatType.TRANSLATE, 'multiplayer.player.left', {
                        color: 'yellow',
                        with: [
                            {
                                text: player.gameProfile.name,
                                insertion: player.gameProfile.name,
                                clickEvent: {
                                    action: 'suggest_command',
                                    value: `/tell ${player.gameProfile.name} `,
                                },
                                hoverEvent: {
                                    action: 'show_entity',
                                    contents: {
                                        type: 'minecraft:player',
                                        id: player.gameProfile.id.toFormattedString(),
                                        name: { text: player.gameProfile.name },
                                    },
                                },
                            },
                        ],
                    }),
                    ChatPermission.SYSTEM,
                    UUID.EMPTY,
                ),
            );
        });

        this.networking.on('error', this.server.console.error);
    }

    public tick() {
        if (this.listener instanceof LoginPacketListener) {
            this.listener.tick();
        }

        if (this.listener instanceof GamePacketListener) {
            this.listener.tick();
        }

        this.flushQueue();
    }

    public send(packet: ClientBoundPacket): void {
        const id = this.server.protocol.getId(this.protocolState, packet);
        if (id === null) throw new Error('Could not find packet id!');
        const packetData = packet.write(new DataBuffer().writeVarInt(id));
        let dataPacket: DataBuffer;

        if (this.compression) {
            if (packetData.buffer.length >= this.server.config.compression) {
                const dataLength = new DataBuffer().writeVarInt(packetData.buffer.length);
                const compressed = deflateSync(packetData.buffer);
                dataPacket = new DataBuffer()
                    .writeVarInt(dataLength.buffer.length + compressed.length)
                    .append(dataLength)
                    .append(compressed);
            } else {
                const dataLength = new DataBuffer().writeVarInt(0);
                dataPacket = new DataBuffer()
                    .writeVarInt(dataLength.buffer.length + packetData.buffer.length)
                    .append(dataLength)
                    .append(packetData);
            }
        } else {
            dataPacket = new DataBuffer().writeVarInt(packetData.buffer.length).append(packetData);
        }

        this.packetQueue.push(dataPacket);
    }

    private flushQueue(): void {
        if (this.packetQueue.length === 0) return;
        const dataPacket = this.packetQueue.reduce((pre, cur) => pre.append(cur), new DataBuffer());

        this.networking.write(this.encryption ? this.encryption.update(dataPacket.buffer) : dataPacket.buffer);
        this.packetQueue = [];
    }

    public disconnect(reason = new Chat(ChatType.TRANSLATE, 'multiplayer.disconnect.generic')): void {
        switch (this.protocol) {
            case ConnectionProtocol.LOGIN: {
                this.send(new ClientBoundLoginDisconnectPacket(reason));
                break;
            }

            case ConnectionProtocol.PLAY: {
                this.send(new ClientBoundDisconnectPacket(reason));
                break;
            }
        }

        this.flushQueue();
        this.networking.end();
    }

    public setProtocol(protocol: ConnectionProtocol): void {
        this.protocol = protocol;
    }

    public setListener(listener: PacketListener): void {
        this.listener = listener;
    }

    public enableEncryption(encrypt: Cipher, decrypt: Decipher): void {
        this.encryption = encrypt;
        this.decryption = decrypt;
    }

    public enableCompression(level: number): void {
        this.send(new ClientBoundLoginCompressionPacket(level));
        this.compression = true;
    }

    public get protocolState() {
        return this.protocol;
    }
}
