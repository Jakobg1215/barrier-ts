import Packet from "../../Packet";
import { PlayServerbound } from "../../../types/PacketIds";

export default class ChatMessagePacket extends Packet {
    public static readonly id = PlayServerbound.ChatMessage;

    public Message!: string;

    public decrypt() {
        this.Message = this.readString();
    }
}