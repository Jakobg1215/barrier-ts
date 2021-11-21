import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';
import type { Action } from './ServerboundPlayerActionPacket';

export default class ClientboundBlockBreakAckPacket implements ClientboundPacket {
    public constructor(public pos: BlockPos, public state: number, public action: Action, public allGood: boolean) {}

    public write(): Packet {
        return new Packet()
            .writeBlockPos(this.pos)
            .writeVarInt(this.state)
            .writeVarInt(this.action)
            .writeBoolean(this.allGood);
    }
}
