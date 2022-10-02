import type BlockPos from '../../../types/classes/BlockPos';
import type { Direction } from '../../../types/enums/Direction';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPlayerActionPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly pos: BlockPos;
    public readonly direction: Direction;
    public readonly action: Action;
    public readonly sequence: number;

    public constructor(data: DataBuffer) {
        this.action = data.readVarInt();
        this.pos = data.readBlockPos();
        this.direction = data.readUnsignedByte();
        this.sequence = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePlayerAction(this);
    }
}

export enum Action {
    START_DESTROY_BLOCK,
    ABORT_DESTROY_BLOCK,
    STOP_DESTROY_BLOCK,
    DROP_ALL_ITEMS,
    DROP_ITEM,
    RELEASE_USE_ITEM,
    SWAP_ITEM_WITH_OFFHAND,
}
