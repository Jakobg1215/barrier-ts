import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundContainerClosePacket implements ClientBoundPacket {
    public constructor(public containerId: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUnsignedByte(this.containerId);
        return packet;
    }
}
