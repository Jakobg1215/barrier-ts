import Packet from "./packets/Packet";
import * as Packets from "./Packets";

export default class PacketRegistry {
    private packets: Map<number, typeof Packet> = new Map();

    public async registerNetwork() {
        await this.registerPackets();
    }
    public getPackets() {
        return this.packets;
    }
    private async registerPackets() {
        Object.entries(Packets).map(([, value]) => this.registerPacket(value));
    }
    private registerPacket(packet: typeof Packet) {
        if (this.packets.has(packet.id))
            throw new Error(
                `Packet ${packet.name} is trying to use id ${packet.id} which already exists!`
            );
        this.packets.set(packet.id, packet);
    }
}