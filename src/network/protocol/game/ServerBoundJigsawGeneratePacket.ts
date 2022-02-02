import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundJigsawGeneratePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly pos: BlockPos;
    public readonly levels: number;
    public readonly keepJigsaws: boolean;

    public constructor(data: DataBuffer) {
        this.pos = data.readBlockPos();
        this.levels = data.readVarInt();
        this.keepJigsaws = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleJigsawGenerate(this);
    }
}
