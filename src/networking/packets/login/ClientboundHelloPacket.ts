import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundHelloPacket implements ClientboundPacket {
    public readonly id: number = 1;
    public serverId: string;
    public publicKey: Buffer;
    public nonce: Buffer;

    public constructor(serverId: string, publicKey: Buffer, nonce: Buffer) {
        this.serverId = serverId;
        this.publicKey = publicKey;
        this.nonce = nonce;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeString(this.serverId);
        data.writeByteArray(this.publicKey);
        data.writeByteArray(this.nonce);
        return data;
    }
}
