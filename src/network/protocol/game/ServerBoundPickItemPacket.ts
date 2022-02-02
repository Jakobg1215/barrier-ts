import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPickItemPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly slot: number;

    public constructor(data: DataBuffer) {
        this.slot = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePickItem(this);
    }
}
