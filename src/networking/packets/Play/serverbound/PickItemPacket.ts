import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class PickItemPacket extends Packet {
    public static readonly id = PlayServerbound.PickItem;

    public Slottouse!: number;

    public decrypt() {
        this.Slottouse = this.readVarInt();
    }
}
