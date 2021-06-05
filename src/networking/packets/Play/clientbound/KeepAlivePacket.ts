import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class KeepAlivePacket extends Packet {
    public static readonly id = PlayClientbound.KeepAlive;

    public KeepAliveID!: bigint;

    public encrypt() {
        this.writeLong(this.KeepAliveID);
    }
}
