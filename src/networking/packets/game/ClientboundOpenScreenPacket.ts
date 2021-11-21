import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundOpenScreenPacket implements ClientboundPacket {
    public constructor(public containerId: number, public type: number, public title: Chat) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.containerId).writeVarInt(this.type).writeChat(this.title);
    }
}
