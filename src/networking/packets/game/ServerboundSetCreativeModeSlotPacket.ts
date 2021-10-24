import type Slot from '../../../types/Slot';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetCreativeModeSlotPacket implements ServerboundPacket {
    public slotNum!: number;
    public itemStack!: Slot;

    public read(data: Packet): this {
        this.slotNum = data.readShort();
        this.itemStack = data.readSlot();
        return this;
    }
}
