import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class ResourcePackStatusPacket extends Packet {
    public static readonly id = PlayServerbound.ResourcePackStatus;

    public Result!: number;

    public decrypt() {
        this.Result = this.readVarInt();
    }
}