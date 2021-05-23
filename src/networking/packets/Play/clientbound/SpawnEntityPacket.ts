import Packet from "../../Packet";
import { PlayClientbound } from "../../../types/PacketIds";

export default class SpawnEntityPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnEntity;

    public EntityID!: number;
    public ObjectUUID!: string;
    public Type!: number;
    public X!: number;
    public Y!: number;
    public Z!: number;
    public Pitch!: number;
    public Yaw!: number;
    public Data!: number;
    public VelocityX!: number;
    public VelocityY!: number;
    public VelocityZ!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUUID(this.ObjectUUID);
        this.writeVarInt(this.Type);
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeUnsignedByte(this.Pitch);
        this.writeUnsignedByte(this.Yaw);
        this.writeInt(this.Data);
        this.writeShort(this.VelocityX);
        this.writeShort(this.VelocityY);
        this.writeShort(this.VelocityZ);
    }
}