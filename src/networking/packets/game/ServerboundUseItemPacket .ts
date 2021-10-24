import type { InteractionHand } from '../../../types/enums/InteractionHand';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundUseItemPacket implements ServerboundPacket {
    public hand!: InteractionHand;

    public read(data: Packet): this {
        this.hand = data.readVarInt();
        return this;
    }
}
