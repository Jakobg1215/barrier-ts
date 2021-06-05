import { PlayServerbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ChatMessagePacket extends Packet {
    public static readonly id = PlayServerbound.ChatMessage;

    public Message!: string;

    public decrypt() {
        this.Message = this.readString();
    }
}
