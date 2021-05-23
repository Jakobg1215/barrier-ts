import Packet from "../Packet";

export default class ChatMessagePacket extends Packet {
    public static readonly id = 0x00;

    public Message!: string;

    public decryptPacket() {
        this.Message = this.readString();
    }

    public encryptPacket() {
        this.writeString(this.Message);
    }
}