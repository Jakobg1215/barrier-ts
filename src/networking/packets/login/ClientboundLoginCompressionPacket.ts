import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginCompressionPacket implements ClientboundPacket {
    public readonly id: number = 3;
    public compressionThreshold: number;

    public constructor(compressionThreshold: number) {
        this.compressionThreshold = compressionThreshold;
    }

    public write(): Packet {
        return new Packet().writeVarInt(this.compressionThreshold);
    }
}
