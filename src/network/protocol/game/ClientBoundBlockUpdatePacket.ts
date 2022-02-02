import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBlockUpdatePacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos, public blockState: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        packet.writeVarInt(this.blockState);
        return packet;
    }
}
