import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundSelectTradePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly item: number;

    public constructor(data: DataBuffer) {
        this.item = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleSelectTrade(this);
    }
}
