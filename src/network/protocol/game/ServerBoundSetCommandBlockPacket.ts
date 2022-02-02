import type BlockPos from '../../../types/classes/BlockPos';
import type { CommandBlockMode } from '../../../types/enums/CommandBlockMode';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetCommandBlockPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly FLAG_TRACK_OUTPUT = 1;
    private static readonly FLAG_CONDITIONAL = 2;
    private static readonly FLAG_AUTOMATIC = 4;
    public readonly pos: BlockPos;
    public readonly command: string;
    public readonly trackOutput: boolean;
    public readonly conditional: boolean;
    public readonly automatic: boolean;
    public readonly mode: CommandBlockMode;

    public constructor(data: DataBuffer) {
        this.pos = data.readBlockPos();
        this.command = data.readString();
        this.mode = data.readVarInt();
        const bitMask = data.readByte();
        this.trackOutput = !!(bitMask & ServerBoundSetCommandBlockPacket.FLAG_TRACK_OUTPUT);
        this.conditional = !!(bitMask & ServerBoundSetCommandBlockPacket.FLAG_CONDITIONAL);
        this.automatic = !!(bitMask & ServerBoundSetCommandBlockPacket.FLAG_AUTOMATIC);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetCommandBlock(this);
    }
}
