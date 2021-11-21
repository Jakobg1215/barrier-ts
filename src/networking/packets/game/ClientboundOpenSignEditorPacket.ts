import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundOpenSignEditorPacket implements ClientboundPacket {
    public constructor(public pos: BlockPos) {}

    public write(): Packet {
        return new Packet().writeBlockPos(this.pos);
    }
}
