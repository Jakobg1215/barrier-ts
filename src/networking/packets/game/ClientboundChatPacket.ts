import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundChatPacket implements ClientboundPacket {
    public constructor(public message: Chat, public type: ChatType, public sender: string) {}

    public write(): Packet {
        return new Packet().writeChat(this.message).writeByte(this.type).writeUUID(this.sender);
    }
}

export enum ChatType {
    CHAT,
    SYSTEM,
    GAME_INFO,
}
