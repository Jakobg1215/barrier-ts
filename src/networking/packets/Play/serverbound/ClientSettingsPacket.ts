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

    public decrypt() {}
}
