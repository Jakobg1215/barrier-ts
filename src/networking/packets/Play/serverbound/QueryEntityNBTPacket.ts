import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class QueryEntityNBTPacket extends Packet {
    public static readonly id = PlayServerbound.QueryEntityNBT;

    public TransactionID!: number;
    public EntityID!: number;

    public decrypt() {
        this.TransactionID = this.readVarInt();
        this.EntityID = this.readVarInt();
    }
}