import Packet from "./packets/Packet";
import { ConnectionStates } from "./types/ConnectionState"
import * as Packets from "./Packets";

export default class NetworkRegistry {
    private HandshakingServerboundPackets: Map<number, typeof Packet> = new Map();
    private StatusClientboundPackets: Map<number, typeof Packet> = new Map();
    private StatusServerboundPackets: Map<number, typeof Packet> = new Map();
    private LoginClientboundPackets: Map<number, typeof Packet> = new Map();
    private LoginServerboundPackets: Map<number, typeof Packet> = new Map();
    private PlayClientboundPackets: Map<number, typeof Packet> = new Map();
    private PlayServerboundPackets: Map<number, typeof Packet> = new Map();

    public async registerNetwork() {
        await this.registerPackets();
    }
    public getPacket(state: number, serverbound: boolean, id: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                return this.HandshakingServerboundPackets.get(id);
            case ConnectionStates.Status:
                if (serverbound) return this.StatusServerboundPackets.get(id);
                return this.StatusClientboundPackets.get(id);
            case ConnectionStates.Login:
                if (serverbound) return this.LoginServerboundPackets.get(id);
                return this.LoginClientboundPackets.get(id);
            case ConnectionStates.Play:
                if (serverbound) return this.PlayServerboundPackets.get(id);
                return this.PlayClientboundPackets.get(id);
            default:
                throw new Error(`unknown state: ${state}`);
        }
    }
    private async registerPackets() {
        Packets.HandshakingServerboundPackets.forEach(packet => {
            this.registerPacket(packet, true, ConnectionStates.Handshaking);
        });
        Packets.StatusClientboundPackets.forEach(packet => {
            this.registerPacket(packet, false, ConnectionStates.Status);
        });
        Packets.StatusServerboundPackets.forEach(packet => {
            this.registerPacket(packet, true, ConnectionStates.Status);
        });
        Packets.LoginClientboundPackets.forEach(packet => {
            this.registerPacket(packet, false, ConnectionStates.Login);
        });
        Packets.LoginServerboundPackets.forEach(packet => {
            this.registerPacket(packet, true, ConnectionStates.Login);
        });
        Packets.PlayClientboundPackets.forEach(packet => {
            this.registerPacket(packet, false, ConnectionStates.Play);
        });
        Packets.PlayServerboundPackets.forEach(packet => {
            this.registerPacket(packet, true, ConnectionStates.Play);
        });
    }
    private registerPacket(packet: typeof Packet, serverbound: boolean, state: number) {
        switch (state) {
            case ConnectionStates.Handshaking:
                if (this.HandshakingServerboundPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.HandshakingServerboundPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Status:
                if (serverbound) {
                    if (this.StatusServerboundPackets.has(packet.id))
                        throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                    this.StatusServerboundPackets.set(packet.id, packet);
                    break;
                }
                if (this.StatusClientboundPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.StatusClientboundPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Login:
                if (serverbound) {
                    if (this.LoginServerboundPackets.has(packet.id))
                        throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                    this.LoginServerboundPackets.set(packet.id, packet);
                    break;
                }
                if (this.LoginClientboundPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.LoginClientboundPackets.set(packet.id, packet);
                break;
            case ConnectionStates.Play:
                if (serverbound) {
                    if (this.PlayServerboundPackets.has(packet.id))
                        throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                    this.PlayServerboundPackets.set(packet.id, packet);
                    break;
                }
                if (this.PlayClientboundPackets.has(packet.id))
                    throw new Error(`Packet ${packet.name} is trying to use id ${packet.id} which already exists!`);
                this.PlayClientboundPackets.set(packet.id, packet);
                break;
        }

    }
}