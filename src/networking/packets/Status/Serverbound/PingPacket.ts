import Packet from "../../Packet";
import { StatusServerbound } from "../../../types/PacketIds";

export default class PingPacket extends Packet {
    public static readonly id = StatusServerbound.Ping;

    public Payload!: bigint;

    public decrypt() {
        this.Payload = this.readLong();
    }
}