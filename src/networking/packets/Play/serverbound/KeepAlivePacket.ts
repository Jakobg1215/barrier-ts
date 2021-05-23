import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class KeepAlivePacket extends Packet {
    public static readonly id = PlayServerbound.KeepAlive;

    public KeepAliveID!: bigint;

    public decrypt() {
        this.KeepAliveID = this.readLong();
    }
}