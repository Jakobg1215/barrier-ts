import { LoginClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SetCompressionPacket extends Packet {
    public static readonly id = LoginClientbound.SetCompression;

    public Threshold!: number;

    public encrypt() {
        this.writeVarInt(this.Threshold);
    }
}
