import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundHelloPacket implements ClientboundPacket {
    public constructor(public serverId: string, public publicKey: Buffer, public nonce: Buffer) {}

    public write(): Packet {
        return new Packet().writeString(this.serverId).writeByteArray(this.publicKey).writeByteArray(this.nonce);
    }
}
