import type Chat from '../../../../types/Chat';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

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
