import { Buffer } from 'node:buffer';
import { Cipher, createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { Socket } from 'node:net';
import { deflateSync, inflateSync } from 'node:zlib';
import type BarrierTs from '../BarrierTs';
import DimensionType from '../types/DimensionType';
import { GameType } from '../types/enums/GameType';
import type GameProfile from '../types/GameProfile';
import RegistryHolder from '../types/RegistryHolder';
import ObjectToNbt from '../utilities/ObjectToNbt';
import Player from '../world/entity/Player';
import type Handler from './handlers/Handler';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundAddPlayerPacket from './packets/game/ClientboundAddPlayerPacket';
import ClientboundCustomPayloadPacket from './packets/game/ClientboundCustomPayloadPacket';
import ClientboundKeepAlivePacket from './packets/game/ClientboundKeepAlivePacket';
import ClientboundLoginPacket from './packets/game/ClientboundLoginPacket';
import ClientboundPlayerAbilitiesPacket from './packets/game/ClientboundPlayerAbilitiesPacket';
import ClientboundPlayerInfoPacket from './packets/game/ClientboundPlayerInfoPacket';
import ClientboundPlayerPositionPacket from './packets/game/ClientboundPlayerPositionPacket';
import ClientboundRemoveEntitiesPacket from './packets/game/ClientboundRemoveEntitiesPacket';
import ClientboundGameProfilePacket from './packets/login/ClientboundGameProfilePacket';
import ClientboundLoginDisconnectPacket from './packets/login/ClientboundLoginDisconnectPacket';
import Packet from './packets/Packet';
import type ServerboundPacket from './packets/ServerboundPacket';
import { ProtocolState } from './Protocol';

export default class Connection {
    private connectionProtocolState: ProtocolState = ProtocolState.HANDSHAKING;
    private readonly connectionNonce: Buffer = randomBytes(4);
    private connectionKey: Buffer | null = null;
    private readonly connectionNetworking: Socket;
    private readonly connectionServer: BarrierTs;
    private connectionName: string | null = null;
    private connectionPlayer!: Player;
    private connectionEncrypted: boolean = false;
    private connectionEncrtyption!: Cipher;
    private connectionDecryption!: Cipher;
    private connectionCompression: boolean = false;
    private connnectionNetworkClosed: boolean = false;
    private connectionConnected: boolean = false;
    private connectionKeepAliveId: Buffer = randomBytes(8);
    private readonly connectionkeepAliveLoop: NodeJS.Timer;

    public constructor(socket: Socket, server: BarrierTs) {
        this.connectionNetworking = socket;
        this.connectionServer = server;

        this.connectionNetworking.on('data', (data: Buffer) => {
            const inPacket: Packet = new Packet(
                this.connectionConnected ? this.connectionDecryption.update(data) : data,
            );

            if (this.connectionCompression) {
                //const packetLength: number = inPacket.readVarInt();
                inPacket.readVarInt();

                const dataLength: number = inPacket.readVarInt();

                // TODO: Handle if wrong size

                const packetData: Packet = new Packet(
                    dataLength > 0 ? inflateSync(inPacket.getReadableBytes()) : inPacket.getReadableBytes(),
                );

                //do {
                const packetid: number = packetData.readVarInt();

                const readPacket: ServerboundPacket | null = this.connectionServer.protocol.getPacket(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!readPacket)
                    return this.connectionServer.console.error(
                        `Server packet ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    readPacket.read(packetData);
                } catch {
                    server.console.error(`Read error for packet ${packetid} on state ${this.connectionProtocolState}!`);
                    return;
                }

                const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!packetHandle)
                    return this.connectionServer.console.warn(
                        `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    packetHandle.hander(readPacket, this, this.connectionServer);
                } catch {
                    server.console.error(
                        `Failed to handler packet ${packetid} on state ${this.connectionProtocolState}!`,
                    );
                }
                //} while (packetData.getReadableBytes().length > 0);
                return;
            }

            do {
                if (this.connnectionNetworkClosed) return;

                const packetLength: number = inPacket.readVarInt();
                if (packetLength !== inPacket.getReadableBytes().length) {
                    // Handle invalid packet length
                }

                const packetid: number = inPacket.readVarInt();

                const readPacket: ServerboundPacket | null = this.connectionServer.protocol.getPacket(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!readPacket)
                    return this.connectionServer.console.error(
                        `Server packet ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    readPacket.read(inPacket);
                } catch {
                    server.console.error(`Read error for packet ${packetid} on state ${this.connectionProtocolState}!`);
                    return;
                }

                const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                    this.connectionProtocolState,
                    packetid,
                );

                if (!packetHandle)
                    return this.connectionServer.console.warn(
                        `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );

                try {
                    packetHandle.hander(readPacket, this, this.connectionServer);
                } catch {
                    server.console.error(
                        `Failed to handler packet ${packetid} on state ${this.connectionProtocolState}!`,
                    );
                }
            } while (inPacket.getReadableBytes().length > 0);
        });

        this.connectionNetworking.on('close', () => {
            this.connnectionNetworkClosed = true;
            if (this.connectionConnected) {
                this.connectionServer.removePlayer();
                this.connectionServer.brodcast(
                    new ClientboundPlayerInfoPacket(4, [
                        {
                            latency: 0,
                            gameMode: GameType.CREATIVE,
                            profile: this.connectionPlayer.gameProfile,
                            displayName: this.connectionPlayer.userName,
                        },
                    ]),
                );
                this.connectionServer.brodcast(new ClientboundRemoveEntitiesPacket([this.connectionPlayer.id]));
            }
            clearInterval(this.connectionkeepAliveLoop);
            this.connectionServer.connections.delete(this);
        });

        this.connectionNetworking.on('error', error => {
            this.connectionServer.console.error(`Client had an ${error.message}`);
        });

        this.connectionkeepAliveLoop = setInterval(() => {
            if (this.connectionConnected) {
                this.connectionKeepAliveId = randomBytes(8);
                this.send(new ClientboundKeepAlivePacket(this.connectionKeepAliveId.readBigInt64BE()));
            }
        }, 15000);
    }

    public createPlayer(gameProfile: GameProfile): void {
        this.connectionPlayer = new Player(gameProfile, this.connectionServer.world.giveUniqueId());
    }

    public setProtocolState(state: ProtocolState): void {
        this.connectionProtocolState = state;
    }

    public disconnect(reason: string): void {
        // TODO: Make use chat type
        switch (this.connectionProtocolState) {
            case ProtocolState.LOGIN: {
                this.send(new ClientboundLoginDisconnectPacket(reason));
                break;
            }

            case ProtocolState.PLAY: {
                break;
            }
        }
        this.end();
    }

    public login(): void {
        this.connectionConnected = true;
        this.send(new ClientboundGameProfilePacket(this.connectionPlayer.gameProfile!));
        this.setProtocolState(ProtocolState.PLAY);
        this.send(
            new ClientboundLoginPacket(
                this.connectionPlayer.id,
                0n,
                false,
                GameType.CREATIVE,
                GameType.CREATIVE,
                ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'],
                ObjectToNbt(RegistryHolder),
                ObjectToNbt(DimensionType),
                'minecraft:overworld',
                this.connectionServer.config.maxplayers,
                10,
                false,
                true,
                true,
                true,
            ),
        );
        this.send(
            new ClientboundCustomPayloadPacket(
                'minecraft:brand',
                new Packet()
                    .writeString(
                        this.connectionServer.config.serverId.length > 0
                            ? `BarrierTs: ${this.connectionServer.config.serverId}`
                            : `BarrierTs`,
                    )
                    .getReadableBytes(),
            ),
        );
        this.send(new ClientboundPlayerAbilitiesPacket(true, true, true, true, 0.05, 0.1));
        this.send(
            new ClientboundPlayerInfoPacket(
                0,
                Array.from(this.connectionServer.connections)
                    .filter(element => element.protocolState === ProtocolState.PLAY)
                    .map(element => {
                        return {
                            latency: 0,
                            gameMode: GameType.CREATIVE,
                            profile: element.connectionPlayer.gameProfile,
                            displayName: this.connectionPlayer.userName,
                        };
                    }),
            ),
        );
        this.connectionServer.brodcast(
            new ClientboundPlayerInfoPacket(0, [
                {
                    latency: 0,
                    gameMode: GameType.CREATIVE,
                    profile: this.connectionPlayer.gameProfile,
                    displayName: this.connectionPlayer.userName,
                },
            ]),
        );
        Array.from(this.connectionServer.connections)
            .filter(element => element.protocolState === ProtocolState.PLAY)
            .forEach(element => {
                if (element.connectionPlayer.id === this.connectionPlayer.id) return;
                this.send(new ClientboundAddPlayerPacket(element.connectionPlayer));
            });
        this.connectionServer.brodcast(new ClientboundAddPlayerPacket(this.connectionPlayer), [
            this.connectionPlayer.id,
        ]);
        this.send(new ClientboundPlayerPositionPacket(0, 0, 0, 0, 0, 0, 0, false)); // this should be the last packet
        if (!this.connectionConnected) return;
        this.connectionServer.addPlayer();
        this.connectionServer.console.log(`Player ${this.connectionPlayer.gameProfile.name} has joined the game!`);
    }

    public end(): void {
        this.connnectionNetworkClosed = true;
        this.connectionNetworking.end();
    }

    public send(data: ClientboundPacket): void {
        const dataWrite = data.write();
        let dataChange: Buffer = dataWrite.getReadableBytes();

        if (this.connectionCompression) {
            if (dataChange.length >= this.connectionServer.config.compression) {
                const uncompressed = new Packet()
                    .writeVarInt(data.id)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes().length;
                const compressed = deflateSync(
                    new Packet().writeVarInt(data.id).append(dataWrite.getReadableBytes()).getReadableBytes(),
                );
                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(uncompressed) + compressed.length).getReadableBytes(),
                    new Packet().writeVarInt(uncompressed).getReadableBytes(),
                    compressed,
                ]);
            } else {
                const uncompressed = new Packet()
                    .writeVarInt(data.id)
                    .append(dataWrite.getReadableBytes())
                    .getReadableBytes();

                dataChange = Buffer.concat([
                    new Packet().writeVarInt(Packet.sizeVarInt(0) + uncompressed.length).getReadableBytes(),
                    new Packet().writeVarInt(0).getReadableBytes(),
                    uncompressed,
                ]);
            }
        } else {
            dataChange = dataWrite.buildPacket(data.id);
        }

        if (this.connectionEncrypted) {
            dataChange = this.connectionEncrtyption.update(dataChange);
        }

        if (this.connnectionNetworkClosed) return;

        this.connectionNetworking.write(dataChange);
    }

    public setName(name: string): void {
        this.connectionName = name;
    }

    public setKey(key: Buffer): void {
        this.connectionKey = key;
    }

    public enableEncryption(): void {
        this.connectionEncrypted = true;
        this.connectionEncrtyption = createCipheriv('aes-128-cfb8', this.connectionKey!, this.connectionKey);
        this.connectionDecryption = createDecipheriv('aes-128-cfb8', this.connectionKey!, this.connectionKey);
    }

    public enableCompression(): void {
        this.connectionCompression = true;
    }

    public get protocolState(): ProtocolState {
        return this.connectionProtocolState;
    }

    public get networking(): Socket {
        return this.connectionNetworking;
    }

    public get player(): Player | null {
        return this.connectionPlayer;
    }

    public get nonce(): Buffer {
        return this.connectionNonce;
    }

    public get name(): string | null {
        return this.connectionName;
    }

    public get keepAliveId(): Buffer {
        return this.connectionKeepAliveId;
    }
}
