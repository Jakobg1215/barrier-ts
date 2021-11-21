import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLevelEventPacket implements ClientboundPacket {
    public constructor(public type: number, public pos: BlockPos, public data: number, public globalEvent: boolean) {}

    public write(): Packet {
        return new Packet()
            .writeInt(this.type)
            .writeBlockPos(this.pos)
            .writeInt(this.data)
            .writeBoolean(this.globalEvent);
    }
}
