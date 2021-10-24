import type BlockPos from '../../../types/classes/BlockPos';
import type { Direction } from '../../../types/enums/Direction';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPlayerActionPacket implements ServerboundPacket {
    public pos!: BlockPos;
    public direction!: Direction;
    public action!: Action;

    public read(data: Packet): this {
        this.action = data.readVarInt();
        this.pos = data.readBlockPos();
        this.direction = data.readUnsignedByte();
        return this;
    }
}

enum Action {
    START_DESTROY_BLOCK,
    ABORT_DESTROY_BLOCK,
    STOP_DESTROY_BLOCK,
    DROP_ALL_ITEMS,
    DROP_ITEM,
    RELEASE_USE_ITEM,
    SWAP_ITEM_WITH_OFFHAND,
}
