import type { InteractionHand } from '../../../types/enums/InteractionHand';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundOpenBookPacket implements ClientboundPacket {
    public constructor(public hand: InteractionHand) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.hand);
    }
}
