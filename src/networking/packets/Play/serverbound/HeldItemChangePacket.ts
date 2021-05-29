import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class HeldItemChangePacket extends Packet {
    public static readonly id = PlayServerbound.HeldItemChange;

    public Slot!: number;

    public decrypt() {
        this.Slot = this.readShort();
    }
}