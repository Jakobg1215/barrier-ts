import type Slot from '../../../types/classes/Slot';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetEquipmentPacket implements ClientboundPacket {
    public constructor(public entity: number, public slots: { pos: number; item: Slot }[]) {}

    public write(): Packet {
        const data: Packet = new Packet().writeVarInt(this.entity);

        for (let item = 0; item < this.slots.length; item++) {
            const flag = item !== this.slots.length - 1;
            if (!this.slots[item]) throw 'Invalid item index!';
            data.writeByte(flag ? this.slots[item]!.pos | -128 : this.slots[item]!.pos).writeSlot(
                this.slots[item]!.item,
            );
        }
        return data;
    }
}
