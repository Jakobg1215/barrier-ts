import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetSubtitleTextPacket implements ClientBoundPacket {
    public constructor(public text: Chat) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeChat(this.text);
        return packet;
    }
}
