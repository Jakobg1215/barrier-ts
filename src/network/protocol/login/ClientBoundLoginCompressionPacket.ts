import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLoginCompressionPacket implements ClientBoundPacket {
    public constructor(public readonly compressionThreshold: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.compressionThreshold);
        return packet;
    }
}
