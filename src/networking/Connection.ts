import { Buffer } from 'node:buffer';
import { Cipher, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { Socket } from 'node:net';
import { deflateSync, inflateSync } from 'node:zlib';
import type BarrierTs from '../BarrierTs';
import type Chat from '../types/classes/Chat';
import { GameType } from '../types/enums/GameType';
import type Handler from './handlers/Handler';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundDisconnectPacket from './packets/game/ClientboundDisconnectPacket';
import ClientboundPlayerInfoPacket from './packets/game/ClientboundPlayerInfoPacket';
import ClientboundRemoveEntitiesPacket from './packets/game/ClientboundRemoveEntitiesPacket';
import ClientboundLoginCompressionPacket from './packets/login/ClientboundLoginCompressionPacket';
import ClientboundLoginDisconnectPacket from './packets/login/ClientboundLoginDisconnectPacket';
import Packet from './packets/Packet';
import type ServerboundPacket from './packets/ServerboundPacket';
import { ProtocolState } from './Protocol';

export default class Connection {
    public protocolState: ProtocolState = ProtocolState.HANDSHAKING;
    public readonly nonce = randomBytes(4);
    private connectionKey!: Buffer;
    public readonly networking: Socket;
    public readonly server: BarrierTs;
    private connectionEncrypted = false;
    private connectionEncrtyption!: Cipher;
    private connectionDecryption!: Cipher;
    private connectionCompression = false;
    private connectionConnected = false;

    public constructor(socket: Socket, server: BarrierTs) {
        this.networking = socket;
        this.server = server;

        this.networking.on('data', data => {
            const inPacket = new Packet(this.connectionEncrypted ? this.connectionDecryption.update(data) : data);

            if (this.connectionCompression) {
                do {
                    const compressedInPacket = new Packet(inPacket.getReadableBytes());

                    const packetLength = inPacket.readVarInt();
                    compressedInPacket.readVarInt();

                    const dataLength = compressedInPacket.readVarInt();
                    const packetData = new Packet(
                        dataLength > 0
                            ? inflateSync(compressedInPacket.getReadableBytes())
                            : compressedInPacket.getReadableBytes(),
                    );

                    // TODO: Need to handle invalid packet length

                    inPacket.addOffset(packetLength, true);

                    const packetid = packetData.readVarInt();

                    const readPacket: ServerboundPacket | null = this.server.protocol.getPacket(
                        this.protocolState,
                        packetid,
                    );

                    if (!readPacket)
                        return this.server.console.error(
                            `Server packet ${packetid} not found for state ${this.protocolState}!`,
                        );

                    try {
                        readPacket.read(packetData);
                    } catch {
                        server.console.error(`Read error for packet ${packetid} on state ${this.protocolState}!`);
                        return;
                    }

                    const packetHandle: Handler<ServerboundPacket> | null = this.server.protocol.getHandler(
                        this.protocolState,
                        packetid,
                    );

                    if (!packetHandle)
                        return this.server.console.warn(
                            `Server handler ${packetid} not found for state ${this.protocolState}!`,
                        );

                    try {
                        packetHandle.hander(readPacket, this.server.playerManager.players.get(this)!, this.server);
                    } catch {
                        server.console.error(`Failed to handler packet ${packetid} on state ${this.protocolState}!`);
                    }
                } while (inPacket.getReadableBytes().length > 0);
                return;
            }

            do {
                //const packetLength: number = inPacket.readVarInt();
                inPacket.readVarInt();

                // TODO: Need to handle invalid packet length

                const packetid: number = inPacket.readVarInt();

                const readPacket: ServerboundPacket | null = this.server.protocol.getPacket(
                    this.protocolState,
                    packetid,
                );

                if (!readPacket)
                    return this.server.console.error(
                        `Server packet ${packetid} not found for state ${this.protocolState}!`,
                    );

                try {
                    readPacket.read(inPacket);
                } catch {
                    server.console.error(`Read error for packet ${packetid} on state ${this.protocolState}!`);
                    return;
                }

                const packetHandle: Handler<ServerboundPacket> | null = this.server.protocol.getHandler(
                    this.protocolState,
                    packetid,
                );

                if (!packetHandle)
                    return this.server.console.warn(
                        `Server handler ${packetid} not found for state ${this.protocolState}!`,
                    );

                try {
                    packetHandle.hander(readPacket, this.server.playerManager.players.get(this)!, this.server);
                } catch {
                    server.console.error(`Failed to handler packet ${packetid} on state ${this.protocolState}!`);
                }
            } while (inPacket.getReadableBytes().length > 0);
        });

        this.networking.on('close', () => {
            this.connectionCompression = false;
            this.connectionEncrypted = false;
            if (this.connectionConnected) {
                this.server.playerManager.sendAll(
                    new ClientboundPlayerInfoPacket(4, [
                        {
                            latency: 0,
                            gameMode: GameType.CREATIVE,
                            profile: this.server.playerManager.players.get(this)!.playerGameProfile,
                            displayName: this.server.playerManager.players.get(this)!.name,
                        },
                    ]),
                );
                this.server.playerManager.sendAll(
                    new ClientboundRemoveEntitiesPacket([this.server.playerManager.players.get(this)!.id]),
                );
            }
            this.server.playerManager.players.delete(this);
        });

        this.networking.on('error', error => {
            this.server.console.error(`Client had an ${error.message}`);
        });
    }

    public disconnect(reason: Chat) {
        switch (this.protocolState) {
            case ProtocolState.LOGIN: {
                this.send(new ClientboundLoginDisconnectPacket(reason));
                break;
            }

            case ProtocolState.PLAY: {
                this.send(new ClientboundDisconnectPacket(reason));
                break;
            }
        }
        this.end();
    }

    public end(): void {
        this.networking.end();
    }

    public send(data: ClientboundPacket) {
        const packetId = this.server.protocol.getId(this.protocolState, data);
        if (packetId === null) return this.server.console.error('Could not find packet id!');
        const dataWrite = data.write();
        let dataChange = dataWrite.getReadableBytes();

        if (this.connectionCompression) {
            if (dataChange.length >= this.server.config.compression) {
                const uncompressed = new Packet()
                    .writeVarInt(packetId)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes().length;
                const compressed = deflateSync(
                    new Packet().writeVarInt(packetId).append(dataWrite.getReadableBytes()).getReadableBytes(),
                );
                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(uncompressed) + compressed.length).getReadableBytes(),
                    new Packet().writeVarInt(uncompressed).getReadableBytes(),
                    compressed,
                ]);
            } else {
                const uncompressed = new Packet()
                    .writeVarInt(packetId)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes();

                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(0) + uncompressed.length).getReadableBytes(),
                    new Packet().writeVarInt(0).getReadableBytes(),
                    uncompressed,
                ]);
            }
        } else {
            dataChange = dataWrite.buildPacket(packetId);
        }

        if (this.connectionEncrypted) {
            dataChange = this.connectionEncrtyption.update(dataChange);
        }

        this.networking.write(dataChange);
    }

    public setKey(key: Buffer) {
        this.connectionKey = key;
    }

    public enableEncryption() {
        this.connectionEncrypted = true;
        this.connectionEncrtyption = createCipheriv('aes-128-cfb8', this.connectionKey, this.connectionKey);
        this.connectionDecryption = createDecipheriv('aes-128-cfb8', this.connectionKey, this.connectionKey);
    }

    public enableCompression() {
        this.send(new ClientboundLoginCompressionPacket(this.server.config.compression));
        this.connectionCompression = true;
    }
}
