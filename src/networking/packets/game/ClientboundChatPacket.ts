import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundChatPacket implements ClientboundPacket {
    public readonly id: number = 15;
    public message: string; // TODO: use type chat
    public type: ChatType;
    public sender: string;

    public constructor(message: string, type: ChatType, sender: string) {
        this.message = message;
        this.type = type;
        this.sender = sender;
    }

    public write(): Packet {
        return new Packet().writeString(this.message).writeByte(this.type).writeUUID(this.sender);
    }
}

enum ChatType {
    CHAT,
    SYSTEM,
    GAME_INFO,
}
