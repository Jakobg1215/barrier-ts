import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSeenAdvancementsPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly action: Action;
    public readonly tab: NameSpace | null = null;

    public constructor(data: DataBuffer) {
        this.action = data.readVarInt();
        if (this.action === Action.OPENED_TAB) this.tab = data.readNameSpace();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSeenAdvancements(this);
    }
}

export enum Action {
    OPENED_TAB,
    CLOSED_SCREEN,
}
