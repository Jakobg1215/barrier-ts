import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SteerBoatPacket extends Packet {
    public static readonly id = PlayServerbound.SteerBoat;

    public Leftpaddleturning!: boolean;
    public Rightpaddleturning!: boolean;

    public decrypt() {
        this.Leftpaddleturning = this.readBoolean();
        this.Rightpaddleturning = this.readBoolean();
    }
}
