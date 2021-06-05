import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class UseItemPacket extends Packet {
    public static readonly id = PlayServerbound.UseItem;

    public Hand!: number;

    public decrypt() {
        this.Hand = this.readVarInt();
    }
}
