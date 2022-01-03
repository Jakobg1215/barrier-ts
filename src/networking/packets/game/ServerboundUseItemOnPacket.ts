import type BlockPos from '../../../types/classes/BlockPos';
import Vector3 from '../../../types/classes/Vector3';
import type { Direction } from '../../../types/enums/Direction';
import type { Hand } from '../../../types/enums/Hand';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundUseItemOnPacket implements ServerboundPacket {
    public location!: Vector3;
    public direction!: Direction;
    public blockPos!: BlockPos;
    public inside!: boolean;
    public hand!: Hand;

    public read(data: Packet): this {
        this.hand = data.readVarInt();
        this.blockPos = data.readBlockPos();
        this.direction = data.readVarInt();
        this.location = new Vector3(data.readFloat(), data.readFloat(), data.readFloat());
        this.inside = data.readBoolean();
        return this;
    }
}
