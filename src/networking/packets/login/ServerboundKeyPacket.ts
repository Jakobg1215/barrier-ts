import type { Buffer } from 'node:buffer';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';
export default class ServerboundKeyPacket implements ServerboundPacket {
    public keybytes!: Buffer;
    public nonce!: Buffer;

    public read(data: Packet): this {
        this.keybytes = data.readByteArray();
        this.nonce = data.readByteArray();
        return this;
    }
}
