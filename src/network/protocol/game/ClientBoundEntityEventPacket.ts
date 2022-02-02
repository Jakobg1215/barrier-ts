import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundEntityEventPacket implements ClientBoundPacket {
    public constructor(public entityId: number, public eventId: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.entityId);
        packet.writeByte(this.eventId);
        return packet;
    }
}
