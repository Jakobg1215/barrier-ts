import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundKeepAlivePacket implements ClientBoundPacket {
    public constructor(public id: bigint) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeLong(this.id);
        return packet;
    }
}
