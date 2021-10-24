import BlockPos from '../../../types/BlockPos';
import Vector3 from '../../../types/Vector3';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetStructureBlockPacket implements ServerboundPacket {
    public pos!: BlockPos;
    public updateType!: UpdateType;
    public mode!: StructureMode;
    public name!: string;
    public offset!: BlockPos;
    public size!: Vector3;
    public mirror!: Mirror;
    public rotation!: Rotation;
    public data!: string;
    public ignoreEntities!: boolean;
    public showAir!: boolean;
    public showBoundingBox!: boolean;
    public integrity!: number;
    public seed!: bigint;

    public read(data: Packet): this {
        this.pos = data.readBlockPos();
        this.updateType = data.readVarInt();
        this.mode = data.readVarInt();
        this.name = data.readString();
        this.offset = new BlockPos(data.readByte(), data.readByte(), data.readByte());
        this.size = new Vector3(data.readByte(), data.readByte(), data.readByte());
        this.mirror = data.readVarInt();
        this.rotation = data.readVarInt();
        this.data = data.readString();
        this.integrity = data.readFloat();
        this.seed = data.readVarLong();
        const bitMask = data.readByte();
        this.ignoreEntities = (bitMask & 1) !== 0;
        this.showAir = (bitMask & 2) !== 0;
        this.showBoundingBox = (bitMask & 4) !== 0;
        return this;
    }
}

enum UpdateType {
    UPDATE_DATA,
    SAVE_AREA,
    LOAD_AREA,
    SCAN_AREA,
}

enum StructureMode {
    SAVE,
    LOAD,
    CORNER,
    DATA,
}

enum Mirror {
    NONE,
    LEFT_RIGHT,
    FRONT_BACK,
}

enum Rotation {
    NONE,
    CLOCKWISE_90,
    CLOCKWISE_180,
    COUNTERCLOCKWISE_90,
}
