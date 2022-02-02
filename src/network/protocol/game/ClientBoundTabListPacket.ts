import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundTabListPacket implements ClientBoundPacket {
    public constructor(public header: Chat, public footer: Chat) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeChat(this.header);
        packet.writeChat(this.footer);
        return packet;
    }
}
