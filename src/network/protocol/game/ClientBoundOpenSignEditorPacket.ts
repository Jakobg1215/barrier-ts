import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundOpenSignEditorPacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        return packet;
    }
}
