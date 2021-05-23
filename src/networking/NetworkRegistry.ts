import Packet from "./packets/Packet";
import { ConnectionStates } from "./types/ConnectionState"
import * as Packets from "./Packets";

export default class PacketRegistry {
    private HandshakingPackets: Map<number, typeof Packet> = new Map();
    private StatusPackets: Map<number, typeof Packet> = new Map();
    private LoginPackets: Map<number, typeof Packet> = new Map();
    private PlayPackets: Map<number, typeof Packet> = new Map();

    public async registerNetwork() {
        await this.registerPackets();
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
}