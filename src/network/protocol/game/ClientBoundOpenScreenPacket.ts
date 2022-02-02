import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundOpenScreenPacket implements ClientBoundPacket {
    public constructor(public containerId: number, public type: number, public title: Chat) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.containerId);
        packet.writeVarInt(this.type);
        packet.writeChat(this.title);
        return packet;
    }
}
