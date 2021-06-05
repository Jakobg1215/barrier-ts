import Packet from '../../Packet';
import { PlayClientbound } from '../../../types/PacketIds';
import type Chat from '../../../../types/Chat';

export default class ChatMessagePacket extends Packet {
    public static readonly id = PlayClientbound.ChatMessage;

    public JSONData!: Chat;
    public Position!: number;
    public Sender!: string;

    public encrypt() {
        this.writeChat(this.JSONData);
        this.writeByte(this.Position);
        this.writeUUID(this.Sender);
    }
}
