import type DataBuffer from '../../DataBuffer';
import type LoginPacketListener from '../../LoginPacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';
import type { Buffer } from 'node:buffer';
import type UUID from '../../../types/classes/UUID';

export default class ServerBoundHelloPacket implements ServerBoundPacket<LoginPacketListener> {
    public readonly name: string;
    public readonly expiresAt: bigint | null = null;
    public readonly publicKey: Buffer | null = null;
    public readonly keySignature: Buffer | null = null;
    public readonly profileId: UUID | null = null;

    public constructor(data: DataBuffer) {
        this.name = data.readString(16);
        if (data.readBoolean()) {
            this.expiresAt = data.readLong();
            this.publicKey = data.readByteArray();
            this.keySignature = data.readByteArray();
        }
        if (data.readBoolean()) {
            this.profileId = data.readUUID();
        }
    }

    public handle(handler: LoginPacketListener): void {
        handler.handleHello(this);
    }
}
