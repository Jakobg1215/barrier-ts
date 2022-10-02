import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundChatAckPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly profileId: UUID | null = null;
    public readonly lastSignature: Buffer | null = null;

    public constructor(data: DataBuffer) {
        if (!data.readBoolean()) return;
        this.profileId = data.readUUID();
        this.lastSignature = data.readByteArray();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChatAckPacket(this);
    }
}
