import type Item from '../../../types/classes/Item';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundContainerSetSlotPacket implements ClientBoundPacket {
    public constructor(
        public containerId: number,
        public stateId: number,
        public slot: number,
        public itemStack: Item,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeByte(this.containerId);
        packet.writeVarInt(this.stateId);
        packet.writeShort(this.slot);
        packet.writeItem(this.itemStack);
        return packet;
    }
}
