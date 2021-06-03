import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class SpawnLivingEntityPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnLivingEntity;

    public EntityID!: number;
    public EntityUUID!: string;
    public Type!: number;
    public X!: number;
    public Y!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;
    public HeadPitch!: number;
    public VelocityX!: number;
    public VelocityY!: number;
    public VelocityZ!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUUID(this.EntityUUID);
        this.writeVarInt(this.Type);
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeAngle(this.Yaw);
        this.writeAngle(this.Pitch);
        this.writeAngle(this.HeadPitch);
        this.writeShort(this.VelocityX);
        this.writeShort(this.VelocityY);
        this.writeShort(this.VelocityZ);
    }
}
