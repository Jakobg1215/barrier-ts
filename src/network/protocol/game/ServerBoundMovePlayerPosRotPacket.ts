import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundMovePlayerPosRotPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;
    public readonly yRot: number;
    public readonly xRot: number;
    public readonly onGround: boolean;

    public constructor(data: DataBuffer) {
        this.x = data.readDouble();
        this.y = data.readDouble();
        this.z = data.readDouble();
        this.yRot = data.readFloat();
        this.xRot = data.readFloat();
        this.onGround = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleMovePlayerPosRot(this);
    }
}
