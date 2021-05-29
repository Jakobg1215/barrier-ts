import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class PickItemPacket extends Packet {
    public static readonly id = PlayServerbound.PickItem;

    public Slottouse!: number;

    public decrypt() {
        this.Slottouse = this.readVarInt();
    }
}