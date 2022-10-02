import type { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundKeyPacket implements ServerBoundPacket<LoginPacketListener> {
    public readonly keybytes: Buffer;
    public readonly nonce: Buffer | null = null;
    public readonly salt: bigint | null = null;
    public readonly signature: Buffer | null = null;

    public constructor(data: DataBuffer) {
        this.keybytes = data.readByteArray();
        if (data.readBoolean()) {
            this.nonce = data.readByteArray();
            return;
        }

        this.salt = data.readLong();
        this.signature = data.readByteArray();
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleKey(this);
    }
}
