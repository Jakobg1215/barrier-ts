import type DataBuffer from '../../DataBuffer';
import type { Buffer } from 'node:buffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundDeleteChatPacket implements ClientBoundPacket {
    public constructor(public messageSignature: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeByteArray(this.messageSignature);
        return packet;
    }
}
