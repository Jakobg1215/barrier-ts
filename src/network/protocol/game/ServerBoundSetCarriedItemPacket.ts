import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSetCarriedItemPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly slot: number;

    public constructor(data: DataBuffer) {
        this.slot = data.readShort();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSetCarriedItem(this);
    }
}
