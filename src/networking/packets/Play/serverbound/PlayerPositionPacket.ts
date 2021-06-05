import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PlayerPositionPacket extends Packet {
    public static readonly id = PlayServerbound.PlayerPosition;

    public X!: number;
    public FeetY!: number;
    public Z!: number;
    public OnGround!: boolean;

    public decrypt() {
        this.X = this.readDouble();
        this.FeetY = this.readDouble();
        this.Z = this.readDouble();
        this.OnGround = this.readBoolean();
    }
}
