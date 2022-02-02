import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPingPacket implements ClientBoundPacket {
    public constructor(public id: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.id);
        return packet;
    }
}
