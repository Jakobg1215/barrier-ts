import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundServerDataPacket implements ClientBoundPacket {
    public constructor(public motd: Chat | null, public iconBase64: string | null, public previewsChat: boolean, public enforcesSecureChat: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBoolean(this.motd !== null);
        if (this.motd) packet.writeChat(this.motd);
        packet.writeBoolean(this.iconBase64 !== null);
        if (this.iconBase64) packet.writeString(this.iconBase64);
        packet.writeBoolean(this.previewsChat);
        packet.writeBoolean(this.enforcesSecureChat);
        return packet;
    }
}
