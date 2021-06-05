import { StatusClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PongPacket extends Packet {
    public static readonly id = StatusClientbound.Pong;

    public Payload!: bigint;

    public encrypt() {
        this.writeLong(this.Payload);
    }
}
