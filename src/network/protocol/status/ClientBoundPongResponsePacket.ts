import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPongResponsePacket implements ClientBoundPacket {
    public constructor(public readonly time: bigint) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeLong(this.time);
        return packet;
    }
}
