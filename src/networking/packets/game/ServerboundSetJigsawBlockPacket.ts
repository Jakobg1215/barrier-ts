import type BlockPos from '../../../types/classes/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetJigsawBlockPacket implements ServerboundPacket {
    public pos!: BlockPos;
    public name!: string;
    public target!: string;
    public pool!: string;
    public finalState!: string;
    public joint!: string;

    public read(data: Packet): this {
        this.pos = data.readBlockPos();
        this.name = data.readString();
        this.target = data.readString();
        this.pool = data.readString();
        this.finalState = data.readString();
        this.joint = data.readString();
        return this;
    }
}
