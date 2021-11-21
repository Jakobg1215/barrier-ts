import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundBlockEventPacket implements ClientboundPacket {
    public constructor(public pos: BlockPos, public b0: number, public b1: number, public block: number) {}

    public write(): Packet {
        return new Packet()
            .writeBlockPos(this.pos)
            .writeUnsignedByte(this.b0)
            .writeUnsignedByte(this.b1)
            .writeVarInt(this.block);
    }
}
