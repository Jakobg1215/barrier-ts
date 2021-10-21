import type { Buffer } from 'node:buffer';
import { createCipheriv, randomBytes } from 'node:crypto';
import type { Socket } from 'node:net';
import type BarrierTs from '../BarrierTs';
import type GameProfile from '../types/GameProfile';
import Player from '../world/entity/Player';
import type Handler from './handlers/Handler';
import Packet from './Packet';
import type ClientboundPacket from './packets/ClientbountPacket';
import ClientboundLoginDisconnectPacket from './packets/login/ClientboundLoginDisconnectPacket';
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

    public constructor(socket: Socket, server: BarrierTs) {
        this.connectionNetworking = socket;
        this.connectionServer = server;

        this.connectionNetworking.on('data', (data: Buffer) => {
            const inPacket: Packet = new Packet(data);
            do {
                // Test if online and need to be compressed.
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
                readPacket.read(inPacket);

                const packetHandle: Handler<ServerboundPacket> | null = this.connectionServer.protocol.getHandler(
                    this.connectionProtocolState,
                    packetid,
                );
                if (!packetHandle)
                    return this.connectionServer.console.warn(
                        `Server handler ${packetid} not found for state ${this.connectionProtocolState}!`,
                    );
                packetHandle.hander(readPacket, this, this.connectionServer);
            } while (inPacket.getReadableBytes().length > 0);
        });

        this.connectionNetworking.on('close', () => {
            this.connnectionNetworkClosed = true;
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

    public end(): void {
        this.connnectionNetworkClosed = true;
        this.connectionNetworking.end();
    }

    public send(data: ClientboundPacket): void {
        let dataChange: Buffer = data.write().buildPacket(data.id);

        if (this.connectionEncryption) {
            const cipher = createCipheriv('aes-128-cfb8', this.connectionKey!, this.connectionKey);
            dataChange = cipher.update(dataChange);
        }

        if (this.connectionCompression) {
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
