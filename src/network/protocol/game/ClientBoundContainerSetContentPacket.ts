import type Item from '../../../types/classes/Item';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundContainerSetContentPacket implements ClientBoundPacket {
    public constructor(
        public containerId: number,
        public stateId: number,
        public items: Item[],
        public carriedItem: Item,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUnsignedByte(this.containerId);
        packet.writeVarInt(this.stateId);
        packet.writeVarInt(this.items.length);
        this.items.forEach(item => packet.writeItem(item));
        packet.writeItem(this.carriedItem);
        return packet;
    }
}
