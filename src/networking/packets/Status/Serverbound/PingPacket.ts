import { StatusServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PingPacket extends Packet {
    public static readonly id = StatusServerbound.Ping;

    public Payload!: bigint;

    public decrypt() {
        this.Payload = this.readLong();
    }
}
