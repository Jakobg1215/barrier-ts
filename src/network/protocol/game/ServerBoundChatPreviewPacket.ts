import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundChatPreviewPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly queryId: number;
    public readonly query: string;

    public constructor(data: DataBuffer) {
        this.queryId = data.readInt();
        this.query = data.readString(256);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChatPreviewPacket(this);
    }
}
