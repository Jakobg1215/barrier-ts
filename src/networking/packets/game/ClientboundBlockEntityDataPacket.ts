import type { Buffer } from 'node:buffer';
import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundBlockEntityDataPacket implements ClientboundPacket {
    public constructor(public pos: BlockPos, public type: number, public tag: Buffer) {}

    public write(): Packet {
        return new Packet().writeBlockPos(this.pos).writeUnsignedByte(this.type).writeNbt(this.tag);
    }
}
