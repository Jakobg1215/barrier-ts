import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBlockDestructionPacket implements ClientBoundPacket {
    public constructor(public id: number, public pos: BlockPos, public progress: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeBlockPos(this.pos);
        packet.writeUnsignedByte(this.progress);
        return packet;
    }
}
