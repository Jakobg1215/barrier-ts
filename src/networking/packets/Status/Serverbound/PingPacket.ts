import Packet from "../../Packet";
import { StatusServerbound } from "../../../types/PacketIds";

export default class RequestPacket extends Packet {
    public static readonly id = StatusServerbound.Request;

    public Payload!: bigint;

    public decrypt() {
        this.Payload = this.readLong();
    }
}