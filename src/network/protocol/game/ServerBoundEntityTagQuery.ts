import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundEntityTagQuery implements ServerBoundPacket<GamePacketListener> {
    public readonly transactionId: number;
    public readonly entityId: number;

    public constructor(data: DataBuffer) {
        this.transactionId = data.readVarInt();
        this.entityId = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleEntityTagQuery(this);
    }
}
