import Packet from "./packets/Packet";
import * as Packets from "./Packets";

export default class PacketRegistry {
    private readonly packets: Map<number, typeof Packet> = new Map();
    public async registerPackets() {
        Object.entries(Packets).map(([, value]) => this.registerPacket(value));
    }
    public getPackets () {
        return this.packets;
    }
    private registerPacket(packet: typeof Packet) {
        if (this.packets.has(packet.id))
            throw new Error(
                `Packet ${packet.name} is trying to use id ${packet.id.toString(16)} which already exists!`
            );
        this.packets.set(packet.id, packet);
    }
}