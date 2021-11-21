import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundTabListPacket implements ClientboundPacket {
    public constructor(public header: Chat, public footer: Chat) {}

    public write(): Packet {
        return new Packet().writeChat(this.header).writeChat(this.footer);
    }
}
