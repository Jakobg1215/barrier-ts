import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class TeleportConfirmPacket extends Packet {
    public static readonly id = PlayServerbound.TeleportConfirm;

    public Locale!: string;
    public ViewDistance!: number;
    public ChatMode!: number;
    public ChatColors!: boolean;
    public DisplayedSkinParts!: number;
    public MainHand!: number;

    public decrypt() {
    }
}