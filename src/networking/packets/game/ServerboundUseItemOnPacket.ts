import type BlockPos from '../../../types/BlockPos';
import type { Direction } from '../../../types/enums/Direction';
import type { InteractionHand } from '../../../types/enums/InteractionHand';
import Vector3 from '../../../types/Vector3';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundUseItemOnPacket implements ServerboundPacket {
    public location!: Vector3;
    public direction!: Direction;
    public blockPos!: BlockPos;
    public inside!: boolean;
    public hand!: InteractionHand;

    public read(data: Packet): this {
        this.hand = data.readVarInt();
        this.blockPos = data.readBlockPos();
        this.direction = data.readVarInt();
        this.location = new Vector3(data.readFloat(), data.readFloat(), data.readFloat());
        this.inside = data.readBoolean();
        return this;
    }
}
