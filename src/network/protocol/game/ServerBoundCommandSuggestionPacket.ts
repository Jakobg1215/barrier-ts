import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundCommandSuggestionPacket implements ServerBoundPacket<GamePacketListener> {
    private static readonly MAX_COMMAND_LENGTH = 32500;
    public readonly id: number;
    public readonly command: string;

    public constructor(data: DataBuffer) {
        this.id = data.readVarInt();
        this.command = data.readString(ServerBoundCommandSuggestionPacket.MAX_COMMAND_LENGTH);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleCommandSuggestions(this);
    }
}
