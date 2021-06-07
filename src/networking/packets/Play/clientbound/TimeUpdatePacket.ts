import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class TimeUpdatePacket extends Packet {
    public static readonly id = PlayClientbound.TimeUpdate;

    public WorldAge!: bigint;
    public Timeofday!: bigint;

    public encrypt() {
        this.writeLong(this.WorldAge);
        this.writeLong(this.Timeofday);
    }
}
