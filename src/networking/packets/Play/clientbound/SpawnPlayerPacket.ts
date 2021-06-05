import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SpawnPlayerPacket extends Packet {
    public static readonly id = PlayClientbound.SpawnPlayer;

    public EntityID!: number;
    public PlayerUUID!: string;
    public X!: number;
    public Y!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;

    public encrypt() {
        this.writeVarInt(this.EntityID);
        this.writeUUID(this.PlayerUUID);
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeUnsignedByte(this.Yaw);
        this.writeUnsignedByte(this.Pitch);
    }
}
