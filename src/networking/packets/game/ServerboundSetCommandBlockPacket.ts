import type BlockPos from '../../../types/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetCommandBlockPacket implements ServerboundPacket {
    public pos!: BlockPos;
    public command!: string;
    public trackOutput!: boolean;
    public conditional!: boolean;
    public automatic!: boolean;
    public mode!: Mode;

    public read(data: Packet): this {
        this.pos = data.readBlockPos();
        this.command = data.readString();
        this.mode = data.readVarInt();
        const bitMask = data.readByte();
        this.trackOutput = (bitMask & 1) !== 0;
        this.conditional = (bitMask & 2) !== 0;
        this.automatic = (bitMask & 4) !== 0;
        return this;
    }
}

enum Mode {
    SEQUENCE,
    AUTO,
    REDSTONE,
}
