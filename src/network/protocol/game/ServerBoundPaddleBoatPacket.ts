import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPaddleBoatPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly left: boolean;
    public readonly right: boolean;

    public constructor(data: DataBuffer) {
        this.left = data.readBoolean();
        this.right = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePaddleBoat(this);
    }
}
