import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class CraftRecipeRequestPacket extends Packet {
    public static readonly id = PlayServerbound.CraftRecipeRequest;

    public WindowID!: number;
    public Recipe!: string;
    public Makeall!: boolean;

    public decrypt() {
        this.WindowID = this.readByte();
        this.Recipe = this.readIdentifier();
        this.Makeall = this.readBoolean();
    }
}
