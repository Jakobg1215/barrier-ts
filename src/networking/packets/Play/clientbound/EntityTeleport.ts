import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class EntityTeleportPacket extends Packet {
    public static readonly id = PlayClientbound.EntityTeleport;

    public EntityID!: number;
    public X!: number;
    public Y!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;
    public OnGround!: boolean;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeAngle(this.Yaw);
        this.writeAngle(this.Pitch);
        this.writeBoolean(this.OnGround);
    }
}
