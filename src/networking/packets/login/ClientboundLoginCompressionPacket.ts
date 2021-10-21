import Packet from '../../Packet';
import type ClientboundPacket from '../ClientbountPacket';

export default class ClientboundLoginCompressionPacket implements ClientboundPacket {
    public readonly id: number = 3;
    public compressionThreshold: number;

    public constructor(compressionThreshold: number) {
        this.compressionThreshold = compressionThreshold;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeVarInt(this.compressionThreshold);
        return data;
    }
}
