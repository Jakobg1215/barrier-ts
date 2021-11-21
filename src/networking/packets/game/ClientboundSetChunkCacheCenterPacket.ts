import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetChunkCacheCenterPacket implements ClientboundPacket {
    public constructor(public x: number, public z: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.x).writeVarInt(this.z);
    }
}
