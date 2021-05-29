import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class SelectTradePacket extends Packet {
    public static readonly id = PlayServerbound.SelectTrade;

    public Selectedslot!: number;

    public decrypt() {
        this.Selectedslot = this.readVarInt();
    }
}