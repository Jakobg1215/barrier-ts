import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundEntityEventPacket implements ClientboundPacket {
    public constructor(public entityId: number, public eventId: number) {}

    public write(): Packet {
        return new Packet().writeInt(this.entityId).writeByte(this.eventId);
    }
}
