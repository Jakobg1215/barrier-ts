import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundContainerSetDataPacket implements ClientboundPacket {
    public constructor(public containerId: number, public id: number, public value: number) {}

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.containerId).writeShort(this.id).writeShort(this.value);
    }
}
