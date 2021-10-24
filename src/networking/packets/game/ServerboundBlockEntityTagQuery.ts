import type BlockPos from '../../../types/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundBlockEntityTagQuery implements ServerboundPacket {
    public transactionId!: number;
    public pos!: BlockPos;

    public read(data: Packet): this {
        this.transactionId = data.readVarInt();
        this.pos = data.readBlockPos();
        return this;
    }
}
