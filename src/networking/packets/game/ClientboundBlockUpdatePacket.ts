import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundBlockUpdatePacket implements ClientboundPacket {
    public constructor(public pos: BlockPos, public blockState: number) {}

    public write(): Packet {
        return new Packet().writeBlockPos(this.pos).writeVarInt(this.blockState);
    }
}
