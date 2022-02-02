import type BlockPos from '../../../types/classes/BlockPos';
import type NameSpace from '../../../types/classes/NameSpace';
import type { JigsawBlockJointType } from '../../../types/enums/JigsawBlockJointType';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetJigsawBlockPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly pos: BlockPos;
    public readonly name: NameSpace;
    public readonly target: NameSpace;
    public readonly pool: NameSpace;
    public readonly finalState: string;
    public readonly joint: JigsawBlockJointType;

    public constructor(data: DataBuffer) {
        this.pos = data.readBlockPos();
        this.name = data.readNameSpace();
        this.target = data.readNameSpace();
        this.pool = data.readNameSpace();
        this.finalState = data.readString();
        this.joint = data.readString() as JigsawBlockJointType;
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetJigsawBlock(this);
    }
}
