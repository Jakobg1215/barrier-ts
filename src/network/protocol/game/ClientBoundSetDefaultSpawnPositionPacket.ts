import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetDefaultSpawnPositionPacket implements ClientBoundPacket {
    public constructor(public pos: BlockPos, public angle: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBlockPos(this.pos);
        packet.writeFloat(this.angle);
        return packet;
    }
}
