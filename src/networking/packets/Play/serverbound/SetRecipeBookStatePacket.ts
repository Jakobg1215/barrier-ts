import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class SetRecipeBookStatePacket extends Packet {
    public static readonly id = PlayServerbound.SetRecipeBookState;

    public BookID!: number;
    public BookOpen!: boolean;
    public FilterActive!: boolean;

    public decrypt() {
        this.BookID = this.readVarInt();
        this.BookOpen = this.readBoolean();
        this.FilterActive = this.readBoolean();
    }
}
