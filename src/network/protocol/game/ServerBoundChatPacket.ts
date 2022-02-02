import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundChatPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_MESSAGE_LENGTH = 256;
    public readonly message: string;

    public constructor(data: DataBuffer) {
        this.message = data.readString(ServerBoundChatPacket.MAX_MESSAGE_LENGTH);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChat(this);
    }
}
