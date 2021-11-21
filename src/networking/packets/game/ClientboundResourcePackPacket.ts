import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundResourcePackPacket implements ClientboundPacket {
    public constructor(public url: string, public hash: string, public required: boolean, public prompt: Chat) {}

    public write(): Packet {
        const data: Packet = new Packet().writeString(this.url).writeString(this.hash).writeBoolean(this.required);
        if (this.required) {
            return data.writeChat(this.prompt);
        }
        return data;
    }
}
