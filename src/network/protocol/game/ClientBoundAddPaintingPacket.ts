import type BlockPos from '../../../types/classes/BlockPos';
import type UUID from '../../../types/classes/UUID';
import type { Direction } from '../../../types/enums/Direction';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAddPaintingPacket implements ClientBoundPacket {
    public constructor(public id: number, public uuid: UUID, public pos: BlockPos, public direction: Direction, public motive: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeUUID(this.uuid);
        packet.writeVarInt(this.motive);
        packet.writeBlockPos(this.pos);
        packet.writeUnsignedByte(this.direction);
        return packet;
    }
}
