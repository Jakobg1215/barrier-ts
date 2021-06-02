import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class VehicleMovePacket extends Packet {
    public static readonly id = PlayServerbound.VehicleMove;

    public X!: number;
    public Y!: number;
    public Z!: number;
    public Yaw!: number;
    public Pitch!: number;

    public decrypt() {
        this.X = this.readDouble();
        this.Y = this.readDouble();
        this.Z = this.readDouble();
        this.Yaw = this.readFloat();
        this.Pitch = this.readFloat();
    }
}
