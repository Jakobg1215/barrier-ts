import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import type Vector3 from '../../../../types/Vector3';

export default class BlockBreakAnimationPacket extends Packet {
    public static readonly id = PlayClientbound.BlockBreakAnimation;

    public EntityID!: number;
    public Location!: Vector3;
    public DestroyStage!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writePosition(this.Location);
        this.writeByte(this.DestroyStage);
    }
}
