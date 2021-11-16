import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetChunkCacheCenterPacket implements ClientboundPacket {
    public readonly id: number = 73;
    public x: number;
    public z: number;

    public constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
    }

    public write(): Packet {
        return new Packet().writeVarInt(this.x).writeVarInt(this.z);
    }
}
