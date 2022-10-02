import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundResourcePackPacket implements ClientBoundPacket {
    public constructor(public url: string, public hash: string, public required: boolean, public prompt: Chat | null) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeString(this.url);
        packet.writeString(this.hash);
        packet.writeBoolean(this.required);
        packet.writeBoolean(this.prompt !== null);
        if (this.prompt) packet.writeChat(this.prompt);
        return packet;
    }
}
