import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBlockChangedAckPacket implements ClientBoundPacket {
    public constructor(public sequence: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.sequence);
        return packet;
    }
}
