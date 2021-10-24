import type { Buffer } from 'node:buffer';
import { constants, createCipheriv, privateDecrypt, randomBytes } from 'node:crypto';
import type { Socket } from 'node:net';
import type BarrierTs from '../BarrierTs';
import DimensionType from '../types/DimensionType';
import { GameType } from '../types/enums/GameType';
import type GameProfile from '../types/GameProfile';
import RegistryHolder from '../types/RegistryHolder';
import ObjectToNbt from '../utilities/ObjectToNbt';
import Player from '../world/entity/Player';
import type Handler from './handlers/Handler';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundLoginPacket from './packets/game/ClientboundLoginPacket';
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
    private connectionPlayer: Player | null = null;
    private connectionEncryption: boolean = false;
    private connectionCompression: boolean = false;
    private connnectionNetworkClosed: boolean = false;
    private connectionConnected: boolean = false;

    public constructor(socket: Socket, server: BarrierTs) {
        this.connectionNetworking = socket;
        this.connectionServer = server;

        this.connectionNetworking.on('data', (data: Buffer) => {
            const inPacket: Packet = this.connectionEncryption
                ? new Packet(
                      privateDecrypt(
                          {
                              key: `-----BEGIN RSA PRIVATE KEY-----\n${server.padLock.privateKey.toString(
                                  'base64',
                              )}\n-----END RSA PRIVATE KEY-----`,
                              padding: constants.RSA_PKCS1_PADDING,
                          },
                          data,
                      ),
                  )
                : new Packet(data);

            if (!this.connectionCompression) {
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
                        server.console.error(
                            `Read error for packet ${packetid} on state ${this.connectionProtocolState}!`,
                        );
                        return;
                    }

                    const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                        this.connectionProtocolState,
                        packetid,
                    );
                    if (!packetHandle) return; /* this.connectionServer.console.warn(
                            `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                        ); */
                    packetHandle.hander(readPacket, this, this.connectionServer);
                } while (inPacket.getReadableBytes().length > 0);
                return;
            }
        });

        this.connectionNetworking.on('close', () => {
            this.connnectionNetworkClosed = true;
            if (this.connectionConnected) {
                this.connectionServer.removePlayer();
            }
            this.connectionServer.connections.delete(this);
        });

        this.connectionNetworking.on('error', error => {
            this.connectionServer.console.error(`Client had an ${error.message}`);
        });
    }

    public createPlayer(gameProfile: GameProfile): void {
        this.connectionPlayer = new Player(gameProfile);
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
        this.send(new ClientboundGameProfilePacket(this.connectionPlayer?.gameProfile!));
        this.setProtocolState(ProtocolState.PLAY);
        this.send(
            new ClientboundLoginPacket(
                0,
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
        this.connectionConnected = true;
        this.connectionServer.addPlayer();
        this.connectionServer.console.log(`Player ${this.connectionPlayer?.gameProfile.name} has joined the game!`);
    }

    public end(): void {
        this.connnectionNetworkClosed = true;
        this.connectionNetworking.end();
    }

    public send(data: ClientboundPacket): void {
        const dataWrite = data.write();
        let dataChange: Buffer = dataWrite.getReadableBytes();

        if (this.connectionCompression) {
            if (dataChange.length > this.connectionServer.config.compression) {
                //deflateSync(dataChange);
            } else {
            }
        } else {
            dataChange = dataWrite.buildPacket(data.id);
        }

        if (this.connectionEncryption) {
            const cipher = createCipheriv('aes-128-cfb8', this.connectionKey!, this.connectionKey);
            dataChange = cipher.update(dataChange);
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
        this.connectionEncryption = true;
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
}
