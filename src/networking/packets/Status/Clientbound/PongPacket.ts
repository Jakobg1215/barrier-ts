import Packet from "../../Packet";
import { StatusClientbound } from "../../../types/PacketIds";

export default class PongPacket extends Packet {
    public static readonly id = StatusClientbound.Pong;

    public Payload!: bigint;

    public encrypt() {
        this.writeLong(this.Payload);
    }
}