import type Slot from '../../../types/Slot';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundContainerClickPacket implements ServerboundPacket {
    public containerId!: number;
    public stateId!: number;
    public slotNum!: number;
    public buttonNum!: number;
    public clickType!: ClickType;
    public carriedItem!: Map<number, Slot>;
    public changedSlots!: Slot;

    public read(data: Packet): this {
        this.containerId = data.readByte();
        this.stateId = data.readVarInt();
        this.slotNum = data.readShort();
        this.buttonNum = data.readByte();
        this.clickType = data.readVarInt();
        for (let index = 0; index < data.readVarInt(); index++) {
            this.carriedItem.set(data.readShort(), data.readSlot());
        }
        this.changedSlots = data.readSlot();
        return this;
    }
}

enum ClickType {
    PICKUP,
    QUICK_MOVE,
    SWAP,
    CLONE,
    THROW,
    QUICK_CRAFT,
    PICKUP_ALL,
}
