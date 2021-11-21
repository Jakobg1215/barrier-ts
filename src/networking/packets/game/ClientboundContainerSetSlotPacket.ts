import type Slot from '../../../types/classes/Slot';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundContainerSetSlotPacket implements ClientboundPacket {
    public constructor(
        public containerId: number,
        public stateId: number,
        public slot: number,
        public itemStack: Slot,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeByte(this.containerId)
            .writeVarInt(this.stateId)
            .writeShort(this.slot)
            .writeSlot(this.itemStack);
    }
}
