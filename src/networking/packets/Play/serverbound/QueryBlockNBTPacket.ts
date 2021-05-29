import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class QueryBlockNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryBlockNBT;

    public TransactionID!: number;
    public Location!: object;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.Location = this.readPosition();
    }
}