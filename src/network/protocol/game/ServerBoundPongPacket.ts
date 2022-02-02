import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPongPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly id: number;

    public constructor(data: DataBuffer) {
        this.id = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePong(this);
    }
}
