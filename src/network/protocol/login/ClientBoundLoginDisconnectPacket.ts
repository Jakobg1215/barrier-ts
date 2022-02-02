import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLoginDisconnectPacket implements ClientBoundPacket {
    public constructor(public readonly reason: Chat) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeChat(this.reason);
        return packet;
    }
}
