import type { Direction } from 'readline';
import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddPaintingPacket implements ClientboundPacket {
    public constructor(
        public id: number,
        public uuid: string,
        public pos: BlockPos,
        public direction: Direction,
        public motive: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.id)
            .writeUUID(this.uuid)
            .writeVarInt(this.motive)
            .writeBlockPos(this.pos)
            .writeUnsignedByte(this.direction);
    }
}
