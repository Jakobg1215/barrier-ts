import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundHorseScreenOpenPacket implements ClientBoundPacket {
    public constructor(public containerId: number, public size: number, public entityId: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUnsignedByte(this.containerId);
        packet.writeVarInt(this.size);
        packet.writeInt(this.entityId);
        return packet;
    }
}
