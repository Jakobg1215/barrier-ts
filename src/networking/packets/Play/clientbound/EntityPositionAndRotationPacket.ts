import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class EntityPositionandRotationPacket extends Packet {
    public static readonly id = PlayClientbound.EntityPositionAndRotation;

    public EntityID!: number;
    public DeltaX!: number;
    public DeltaY!: number;
    public DeltaZ!: number;
    public Yaw!: number;
    public Pitch!: number;
    public OnGround!: boolean;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeShort(this.DeltaX);
        this.writeShort(this.DeltaY);
        this.writeShort(this.DeltaZ);
        this.writeAngle(this.Yaw);
        this.writeAngle(this.Pitch);
        this.writeBoolean(this.OnGround);
    }
}
