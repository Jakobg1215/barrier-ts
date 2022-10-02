import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundChatPreviewPacket implements ClientBoundPacket {
    public constructor(public queryId: number, public preview: Chat | null) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.queryId);
        if (!this.preview) {
            packet.writeBoolean(false);
            return packet;
        }
        packet.writeBoolean(true);
        packet.writeChat(this.preview);
        return packet;
    }
}
