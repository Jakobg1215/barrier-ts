import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';
import type { Buffer } from 'node:buffer';
import type UUID from '../../../types/classes/UUID';

export default class ServerBoundChatCommandPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly command: string;
    public readonly timeStamp: bigint;
    public readonly salt: bigint;
    public readonly entries: { name: string; signature: Buffer }[] = [];
    public readonly signedPreview: boolean;
    public readonly profileId: UUID | null = null;
    public readonly lastSignature: Buffer | null = null;

    public constructor(data: DataBuffer) {
        this.command = data.readString(256);
        this.timeStamp = data.readLong();
        this.salt = data.readLong();
        const argumentCount = data.readVarInt();
        for (let index = 0; index < argumentCount; index++) {
            const name = data.readString(16);
            const signature = data.readByteArray();
            this.entries.push({ name, signature });
        }
        this.signedPreview = data.readBoolean();
        if (!data.readBoolean()) return;
        this.profileId = data.readUUID();
        this.lastSignature = data.readByteArray();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChatCommandPacket(this);
    }
}
