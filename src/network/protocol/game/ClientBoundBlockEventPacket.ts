import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBlockEventPacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos, public b0: number, public b1: number, public block: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        packet.writeUnsignedByte(this.b0);
        packet.writeUnsignedByte(this.b1);
        packet.writeVarInt(this.block);
        return packet;
    }
}
