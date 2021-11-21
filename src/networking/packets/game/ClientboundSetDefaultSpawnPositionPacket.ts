import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetDefaultSpawnPositionPacket implements ClientboundPacket {
    public constructor(public pos: BlockPos, public angle: number) {}

    public write(): Packet {
        return new Packet().writeBlockPos(this.pos).writeFloat(this.angle);
    }
}
