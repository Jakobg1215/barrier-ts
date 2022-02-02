import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundContainerButtonClickPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly containerId: number;
    public readonly buttonId: number;

    public constructor(data: DataBuffer) {
        this.containerId = data.readByte();
        this.buttonId = data.readByte();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleContainerButtonClick(this);
    }
}
