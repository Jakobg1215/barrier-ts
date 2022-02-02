import type { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundKeyPacket implements ServerBoundPacket<LoginPacketListener> {
    public readonly keybytes: Buffer;
    public readonly nonce: Buffer;

    public constructor(data: DataBuffer) {
        this.keybytes = data.readByteArray();
        this.nonce = data.readByteArray();
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleKey(this);
    }
}
