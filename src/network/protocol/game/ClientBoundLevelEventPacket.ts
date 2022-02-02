import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLevelEventPacket implements ClientBoundPacket {
    public constructor(public type: number, public pos: BlockPos, public data: number, public globalEvent: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.type);
        packet.writeBlockPos(this.pos);
        packet.writeInt(this.data);
        packet.writeBoolean(this.globalEvent);
        return packet;
    }
}
