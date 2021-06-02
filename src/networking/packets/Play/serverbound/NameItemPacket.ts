import Packet from '../../Packet';
import { PlayServerbound } from '../../../types/PacketIds';

export default class NameItemPacket extends Packet {
    public static readonly id = PlayServerbound.NameItem;

    public Itemname!: string;

    public decrypt() {
        this.Itemname = this.readString();
    }
}
