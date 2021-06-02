import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class PlayerPositionAndLookPacket extends Packet {
    public static readonly id = PlayClientbound.PlayerPositionAndLook;

    public X!: number;
    public Y!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;
    public Flags!: number;
    public TeleportID!: number;

    public encrypt() {
        this.writeDouble(this.X);
        this.writeDouble(this.Y);
        this.writeDouble(this.Z);
        this.writeFloat(this.Yaw);
        this.writeFloat(this.Pitch);
        this.writeByte(this.Flags);
        this.writeVarInt(this.TeleportID);
    }
}
