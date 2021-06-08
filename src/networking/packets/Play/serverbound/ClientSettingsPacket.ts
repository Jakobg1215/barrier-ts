import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ClientSettingsPacket extends Packet {
    public static readonly id = PlayServerbound.ClientSettings;

    public Locale!: string;
    public ViewDistance!: number;
    public ChatMode!: number;
    public ChatColors!: boolean;
    public DisplayedSkinParts!: number;
    public MainHand!: number;
    public Disabletextfiltering!: boolean;

    public decrypt() {
        this.Locale = this.readString();
        this.ViewDistance = this.readByte();
        this.ChatMode = this.readVarInt();
        this.ChatColors = this.readBoolean();
        this.DisplayedSkinParts = this.readUnsignedByte();
        this.MainHand = this.readVarInt();
        this.Disabletextfiltering = this.readBoolean();
    }
}
