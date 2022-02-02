import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundClientCommandPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly action: Action;

    public constructor(data: DataBuffer) {
        this.action = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleClientCommand(this);
    }
}

export enum Action {
    PERFORM_RESPAWN,
    REQUEST_STATS,
}
