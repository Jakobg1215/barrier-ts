import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundCommandSuggestionPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly id: number;
    public readonly command: string;

    public constructor(data: DataBuffer) {
        this.id = data.readVarInt();
        this.command = data.readString(32500);
    }

    public handle(handler: GamePacketListener): void {
        handler.handleCommandSuggestions(this);
    }
}
