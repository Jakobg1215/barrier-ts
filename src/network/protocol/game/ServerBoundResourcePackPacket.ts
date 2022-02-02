import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundResourcePackPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly action: Action;

    public constructor(data: DataBuffer) {
        this.action = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleResourcePack(this);
    }
}

export enum Action {
    SUCCESSFULLY_LOADED,
    DECLINED,
    FAILED_DOWNLOAD,
    ACCEPTED,
}
