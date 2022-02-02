import type Item from '../../../types/classes/Item';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetEquipmentPacket implements ClientBoundPacket {
    public constructor(public entity: number, public slots: { pos: number; item: Item }[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entity);
        for (let item = 0; item < this.slots.length; item++) {
            const flag = item !== this.slots.length - 1;
            if (!this.slots[item]) throw 'Invalid item index!';
            packet.writeByte(flag ? this.slots[item]!.pos | -128 : this.slots[item]!.pos);
            packet.writeItem(this.slots[item]!.item);
        }
        return packet;
    }
}
