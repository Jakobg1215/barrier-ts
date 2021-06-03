import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import type Position from '../../../../types/Position';

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
