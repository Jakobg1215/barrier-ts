import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundBlockEntityTagQuery implements ServerBoundPacket<GamePacketListener> {
    public readonly transactionId: number;
    public readonly pos: BlockPos;

    public constructor(data: DataBuffer) {
        this.transactionId = data.readVarInt();
        this.pos = data.readBlockPos();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleBlockEntityTagQuery(this);
    }
}
