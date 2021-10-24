import type BlockPos from '../../../types/classes/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundJigsawGeneratePacket implements ServerboundPacket {
    public pos!: BlockPos;
    public levels!: number;
    public keepJigsaws!: boolean;

    public read(data: Packet): this {
        this.pos = data.readBlockPos();
        this.levels = data.readVarInt();
        this.keepJigsaws = data.readBoolean();
        return this;
    }
}
