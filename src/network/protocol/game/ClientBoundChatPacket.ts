import type Chat from '../../../types/classes/Chat';
import type UUID from '../../../types/classes/UUID';
import type { ChatPermission } from '../../../types/enums/ChatPermission';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundChatPacket implements ClientBoundPacket {
    public constructor(public message: Chat, public type: ChatPermission, public sender: UUID) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeChat(this.message);
        packet.writeByte(this.type);
        packet.writeUUID(this.sender);
        return packet;
    }
}
