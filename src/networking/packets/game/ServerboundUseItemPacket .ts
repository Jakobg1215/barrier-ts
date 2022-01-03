import type { Hand } from '../../../types/enums/Hand';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundUseItemPacket implements ServerboundPacket {
    public hand!: Hand;

    public read(data: Packet): this {
        this.hand = data.readVarInt();
        return this;
    }
}
