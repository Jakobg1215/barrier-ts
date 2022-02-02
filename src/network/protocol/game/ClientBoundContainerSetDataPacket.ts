import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundContainerSetDataPacket implements ClientBoundPacket {
    public constructor(public containerId: number, public id: number, public value: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUnsignedByte(this.containerId);
        packet.writeShort(this.id);
        packet.writeShort(this.value);
        return packet;
    }
}
