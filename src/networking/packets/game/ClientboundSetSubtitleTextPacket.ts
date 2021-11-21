import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetSubtitleTextPacket implements ClientboundPacket {
    public constructor(public text: Chat) {}

    public write(): Packet {
        return new Packet().writeChat(this.text);
    }
}
