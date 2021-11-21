import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundDisconnectPacket implements ClientboundPacket {
    public constructor(public reason: Chat) {}

    public write(): Packet {
        return new Packet().writeChat(this.reason);
    }
}
