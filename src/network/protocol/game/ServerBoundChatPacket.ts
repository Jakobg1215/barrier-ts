import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundChatPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly message: string;
    public readonly timeStamp: bigint;
    public readonly salt: bigint;
    public readonly signature: Buffer;
    public readonly signedPreview: boolean;
    public readonly profileId: UUID | null = null;
    public readonly lastSignature: Buffer | null = null;

    public constructor(data: DataBuffer) {
        this.message = data.readString(256);
        this.timeStamp = data.readLong();
        this.salt = data.readLong();
        this.signature = data.readByteArray();
        this.signedPreview = data.readBoolean();
        if (!data.readBoolean()) return;
        this.profileId = data.readUUID();
        this.lastSignature = data.readByteArray();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChat(this);
    }
}
