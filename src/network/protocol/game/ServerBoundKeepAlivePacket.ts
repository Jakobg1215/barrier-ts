import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundKeepAlivePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly id: bigint;

    public constructor(data: DataBuffer) {
        this.id = data.readLong();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleKeepAlive(this);
    }
}
