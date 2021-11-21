import type Slot from '../../../types/classes/Slot';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundContainerSetContentPacket implements ClientboundPacket {
    public constructor(
        public containerId: number,
        public stateId: number,
        public items: Slot[],
        public carriedItem: Slot,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeUnsignedByte(this.containerId)
            .writeVarInt(this.stateId)
            .writeVarInt(this.items.length);
        this.items.forEach(item => data.writeSlot(item));
        return data.writeSlot(this.carriedItem);
    }
}
