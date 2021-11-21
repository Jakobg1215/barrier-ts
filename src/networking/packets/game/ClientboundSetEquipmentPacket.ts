import type Slot from '../../../types/classes/Slot';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetEquipmentPacket implements ClientboundPacket {
    public constructor(public entity: number, public slots: { pos: number; item: Slot }[]) {}

    public write(): Packet {
        const data: Packet = new Packet().writeVarInt(this.entity);
        this.slots.forEach(slot => {
            data.writeByte(slot.pos);
            data.writeSlot(slot.item);
        });
        return data;
    }
}
