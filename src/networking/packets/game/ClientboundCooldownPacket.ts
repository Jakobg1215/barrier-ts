import type Slot from '../../../types/classes/Slot';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCooldownPacket implements ClientboundPacket {
    public constructor(public item: Slot, public duration: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.item.id).writeVarInt(this.duration);
    }
}
