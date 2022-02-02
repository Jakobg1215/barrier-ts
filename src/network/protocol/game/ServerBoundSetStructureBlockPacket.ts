import BlockPos from '../../../types/classes/BlockPos';
import type { BlockMirror } from '../../../types/enums/BlockMirror';
import type { BlockRotation } from '../../../types/enums/BlockRotation';
import type { StructureBlockStructureMode } from '../../../types/enums/StructureBlockStructureMode';
import type { StructureBlockUpdateType } from '../../../types/enums/StructureBlockUpdateType';
import Vector3 from '../../../utilitys/Vector3';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetStructureBlockPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly FLAG_IGNORE_ENTITIES = 1;
    private static readonly FLAG_SHOW_AIR = 2;
    private static readonly FLAG_SHOW_BOUNDING_BOX = 4;
    private static readonly MAX_DATA_LENGTH = 128;
    public readonly pos: BlockPos;
    public readonly updateType: StructureBlockUpdateType;
    public readonly mode: StructureBlockStructureMode;
    public readonly name: string;
    public readonly offset: BlockPos;
    public readonly size: Vector3;
    public readonly mirror: BlockMirror;
    public readonly rotation: BlockRotation;
    public readonly data: string;
    public readonly ignoreEntities: boolean;
    public readonly showAir: boolean;
    public readonly showBoundingBox: boolean;
    public readonly integrity: number;
    public readonly seed: bigint;

    public constructor(data: DataBuffer) {
        this.pos = data.readBlockPos();
        this.updateType = data.readVarInt();
        this.mode = data.readVarInt();
        this.name = data.readString();
        this.offset = new BlockPos(data.readByte(), data.readByte(), data.readByte());
        this.size = new Vector3(data.readByte(), data.readByte(), data.readByte());
        this.mirror = data.readVarInt();
        this.rotation = data.readVarInt();
        this.data = data.readString(ServerBoundSetStructureBlockPacket.MAX_DATA_LENGTH);
        this.integrity = data.readFloat();
        this.seed = data.readVarLong();
        const bitMask = data.readByte();
        this.ignoreEntities = !!(bitMask & ServerBoundSetStructureBlockPacket.FLAG_IGNORE_ENTITIES);
        this.showAir = !!(bitMask & ServerBoundSetStructureBlockPacket.FLAG_SHOW_AIR);
        this.showBoundingBox = !!(bitMask & ServerBoundSetStructureBlockPacket.FLAG_SHOW_BOUNDING_BOX);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetStructureBlock(this);
    }
}
