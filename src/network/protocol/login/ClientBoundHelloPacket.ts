import type { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundHelloPacket implements ClientBoundPacket {
    public constructor(public readonly serverId: string, public readonly publicKey: Buffer, public readonly nonce: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeString(this.serverId, 20);
        packet.writeByteArray(this.publicKey);
        packet.writeByteArray(this.nonce);
        return packet;
    }
}
