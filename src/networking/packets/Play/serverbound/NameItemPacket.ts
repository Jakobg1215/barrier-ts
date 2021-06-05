import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class NameItemPacket extends Packet {
    public static readonly id = PlayServerbound.NameItem;

    public Itemname!: string;

    public decrypt() {
        this.Itemname = this.readString();
    }
}
