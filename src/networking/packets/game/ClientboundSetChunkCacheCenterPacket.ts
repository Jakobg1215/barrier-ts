import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetChunkCacheCenterPacket implements ClientboundPacket {
    public readonly id: number = 73;
    public x: number;
    public y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public write(): Packet {
        return new Packet().writeVarInt(this.x).writeVarInt(this.y);
    }
}
