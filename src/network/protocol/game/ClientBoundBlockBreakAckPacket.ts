import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type { Action } from './ServerBoundPlayerActionPacket';

export default class ClientBoundBlockBreakAckPacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos, public state: number, public action: Action, public allGood: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        packet.writeVarInt(this.state);
        packet.writeVarInt(this.action);
        packet.writeBoolean(this.allGood);
        return packet;
    }
}
