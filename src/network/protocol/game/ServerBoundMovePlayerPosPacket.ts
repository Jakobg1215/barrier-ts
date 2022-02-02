import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundMovePlayerPosPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly onGround: boolean;

    public constructor(data: DataBuffer) {
        this.x = data.readDouble();
        this.y = data.readDouble();
        this.z = data.readDouble();
        this.onGround = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleMovePlayerPos(this);
    }
}
