import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginDisconnectPacket implements ClientboundPacket {
    public readonly id: number = 0;
    public reason: Chat;

    public constructor(reason: Chat) {
        this.reason = reason;
    }

    public write(): Packet {
        return new Packet().writeChat(this.reason);
    }
}
