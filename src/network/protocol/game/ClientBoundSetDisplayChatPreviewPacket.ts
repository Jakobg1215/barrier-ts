import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetDisplayChatPreviewPacket implements ClientBoundPacket {
    public constructor(public enabled: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeBoolean(this.enabled);
        return packet;
    }
}
