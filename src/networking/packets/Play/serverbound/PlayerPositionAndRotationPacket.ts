import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PlayerPositionAndRotationPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerPositionAndRotation;

    public X!: number;
    public FeetY!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;
    public OnGround!: boolean;

    public decrypt() {
        this.X = this.readDouble();
        this.FeetY = this.readDouble();
        this.Z = this.readDouble();
        this.Yaw = this.readFloat();
        this.Pitch = this.readFloat();
        this.OnGround = this.readBoolean();
    }
}
