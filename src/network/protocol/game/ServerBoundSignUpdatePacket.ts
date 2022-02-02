import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSignUpdatePacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_STRING_LENGTH = 384;
    public readonly pos: BlockPos;
    public readonly lines: [string, string, string, string];

    public constructor(data: DataBuffer) {
        this.pos = data.readBlockPos();
        this.lines = [
            data.readString(ServerBoundSignUpdatePacket.MAX_STRING_LENGTH),
            data.readString(ServerBoundSignUpdatePacket.MAX_STRING_LENGTH),
            data.readString(ServerBoundSignUpdatePacket.MAX_STRING_LENGTH),
            data.readString(ServerBoundSignUpdatePacket.MAX_STRING_LENGTH),
        ];
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSignUpdate(this);
    }
}
