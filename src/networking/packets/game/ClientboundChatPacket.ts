import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundChatPacket implements ClientboundPacket {
    public readonly id: number = 15;
    public message: Chat;
    public type: ChatType;
    public sender: string;

    public constructor(message: Chat, type: ChatType, sender: string) {
        this.message = message;
        this.type = type;
        this.sender = sender;
    }

    public write(): Packet {
        return new Packet().writeChat(this.message).writeByte(this.type).writeUUID(this.sender);
    }
}

enum ChatType {
    CHAT,
    SYSTEM,
    GAME_INFO,
}
