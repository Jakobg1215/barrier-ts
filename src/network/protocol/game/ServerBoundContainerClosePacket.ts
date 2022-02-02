import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundContainerClosePacket implements ServerBoundPacket<GamePacketListener> {
    public readonly containerId: number;

    public constructor(data: DataBuffer) {
        this.containerId = data.readByte();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleContainerClose(this);
    }
}
