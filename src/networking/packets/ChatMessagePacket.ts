import Packet from "./Packet";
import { ServerboundPacketIds } from "../types/PacketIds";

export default class ChatMessagePacket extends Packet {
    public static id = ServerboundPacketIds.ChatMessage;

    public Message!: string;

    public decryptPacket() {
        this.Message = this.readString();
    }
}