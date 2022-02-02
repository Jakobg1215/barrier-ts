import type Item from '../../../types/classes/Item';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCooldownPacket implements ClientBoundPacket {
    public constructor(public item: Item, public duration: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.item.id);
        packet.writeVarInt(this.duration);
        return packet;
    }
}
