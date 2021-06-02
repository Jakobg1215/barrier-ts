import { ConnectionStates } from './types/ConnectionState';
import type Handler from './handlers/Handler';
import * as Handlers from './Handlers';
import type Packet from './packets/Packet';
import * as Packets from './Packets';

export default class NetworkRegistry {
    private HandshakingPackets: Map<number, typeof Packet> = new Map();
    private StatusPackets: Map<number, typeof Packet> = new Map();
    private LoginPackets: Map<number, typeof Packet> = new Map();
    private PlayPackets: Map<number, typeof Packet> = new Map();
    private HandshakeHandlers: Map<number, Handler<any>> = new Map();
    private StatusHandlers: Map<number, Handler<any>> = new Map();
    private LoginHandlers: Map<number, Handler<any>> = new Map();
    private PlayHandlers: Map<number, Handler<any>> = new Map();

    public async registerNetwork() {
        await this.registerPackets();
        await this.registerHandlers();
    }

    public getPacket(state: number, id: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                return this.HandshakingPackets.get(id);
            case ConnectionStates.Status:
                return this.StatusPackets.get(id);
            case ConnectionStates.Login:
                return this.LoginPackets.get(id);
            case ConnectionStates.Play:
                return this.PlayPackets.get(id);
            default:
                throw new Error(`unknown state: ${state}`);
        }
    }

    public getHandler(state: number, id: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                return this.HandshakeHandlers.get(id);
            case ConnectionStates.Status:
                return this.StatusHandlers.get(id);
            case ConnectionStates.Login:
                return this.LoginHandlers.get(id);
            case ConnectionStates.Play:
                return this.PlayHandlers.get(id);
            default:
                throw new Error(`unknown state: ${state}`);
        }
    }

    private async registerPackets() {
        Packets.HandshakingPackets.forEach(packet => {
            this.registerPacket(packet, ConnectionStates.Handshaking);
        });
        Packets.StatusPackets.forEach(packet => {
            this.registerPacket(packet, ConnectionStates.Status);
        });
        Packets.LoginPackets.forEach(packet => {
            this.registerPacket(packet, ConnectionStates.Login);
        });
        Packets.PlayPackets.forEach(packet => {
            this.registerPacket(packet, ConnectionStates.Play);
        });
    }

    private registerPacket(packet: typeof Packet, state: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                if (this.HandshakingPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.HandshakingPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Status:
                if (this.StatusPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.StatusPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Login:
                if (this.LoginPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.LoginPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Play:
                if (this.PlayPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.PlayPackets.set(packet.id, packet);
                break;
        }
    }

    private async registerHandlers() {
        Handlers.HandshakeHandlers.forEach(handler => {
            this.registerHandler(handler, ConnectionStates.Handshaking);
        });
        Handlers.StatusHandlers.forEach(handler => {
            this.registerHandler(handler, ConnectionStates.Status);
        });
        Handlers.LoginHandlers.forEach(handler => {
            this.registerHandler(handler, ConnectionStates.Login);
        });
        Handlers.PlayHandlers.forEach(handler => {
            this.registerHandler(handler, ConnectionStates.Play);
        });
    }

    private registerHandler(handler: Handler<any>, state: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                if (this.HandshakeHandlers.has(handler.id))
                    throw new Error(`Handler with id ${handler.id} already exists!`);
                this.HandshakeHandlers.set(handler.id, handler);
                break;
            case ConnectionStates.Status:
                if (this.StatusHandlers.has(handler.id))
                    throw new Error(`Handler with id ${handler.id} already exists!`);
                this.StatusHandlers.set(handler.id, handler);
                break;
            case ConnectionStates.Login:
                if (this.LoginHandlers.has(handler.id))
                    throw new Error(`Handler with id ${handler.id} already exists!`);
                this.LoginHandlers.set(handler.id, handler);
                break;
            case ConnectionStates.Play:
                if (this.PlayHandlers.has(handler.id)) throw new Error(`Handler with id ${handler.id} already exists!`);
                this.PlayHandlers.set(handler.id, handler);
                break;
        }
    }
}
