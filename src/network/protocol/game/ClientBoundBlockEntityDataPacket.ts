import type { Buffer } from 'node:buffer';
import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundBlockEntityDataPacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos, public type: number, public tag: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        packet.writeVarInt(this.type);
        packet.writeNbt(this.tag);
        return packet;
    }
}
