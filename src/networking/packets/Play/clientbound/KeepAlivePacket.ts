import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';

export default class KeepAlivePacket extends Packet {
    public static readonly id = PlayClientbound.KeepAlive;

    public KeepAliveID!: bigint;

    public encrypt() {
        this.writeLong(this.KeepAliveID);
    }
}
