import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundBlockDestructionPacket implements ClientboundPacket {
    public constructor(public id: number, public pos: BlockPos, public progress: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.id).writeBlockPos(this.pos).writeUnsignedByte(this.progress);
    }
}
