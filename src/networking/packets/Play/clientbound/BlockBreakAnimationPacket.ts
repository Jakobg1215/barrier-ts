import type Position from '../../../../types/Position';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class BlockBreakAnimationPacket extends Packet {
    public static readonly id = PlayClientbound.BlockBreakAnimation;

    public EntityID!: number;
    public Location!: Position;
    public DestroyStage!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writePosition(this.Location);
        this.writeByte(this.DestroyStage);
    }
}
