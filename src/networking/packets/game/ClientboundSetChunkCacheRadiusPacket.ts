import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetChunkCacheRadiusPacket implements ClientboundPacket {
    public constructor(public radius: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.radius);
    }
}
