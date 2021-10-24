import type BlockPos from '../../../types/classes/BlockPos';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundBlockEntityTagQueryPacket implements ServerboundPacket {
    public transactionId!: number;
    public pos!: BlockPos;

    public read(data: Packet): this {
        this.transactionId = data.readVarInt();
        this.pos = data.readBlockPos();
        return this;
    }
}
