import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class ClickWindowButtonPacket extends Packet {
    public static readonly id = PlayServerbound.ClickWindowButton;

    public WindowID!: number;
    public ButtonID!: number;

    public decrypt() {
        this.WindowID = this.readByte();
        this.ButtonID = this.readByte();
    }
}