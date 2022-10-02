import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSystemChatPacket implements ClientBoundPacket {
    public constructor(public content: Chat, public overlay: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeChat(this.content);
        packet.writeBoolean(this.overlay);
        return packet;
    }
}
