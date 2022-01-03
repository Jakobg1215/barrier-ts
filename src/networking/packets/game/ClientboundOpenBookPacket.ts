import type { Hand } from '../../../types/enums/Hand';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundOpenBookPacket implements ClientboundPacket {
    public constructor(public hand: Hand) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.hand);
    }
}
