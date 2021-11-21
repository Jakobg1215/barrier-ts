import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginCompressionPacket implements ClientboundPacket {
    public constructor(public compressionThreshold: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.compressionThreshold);
    }
}
