import type { InteractionHand } from '../../../types/enums/InteractionHand';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundOpenBookPacket implements ClientBoundPacket {
    public constructor(public hand: InteractionHand) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.hand);
        return packet;
    }
}
