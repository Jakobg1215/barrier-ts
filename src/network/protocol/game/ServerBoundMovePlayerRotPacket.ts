import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundMovePlayerRotPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly yRot: number;
    public readonly xRot: number;
    public readonly onGround: boolean;

    public constructor(data: DataBuffer) {
        this.yRot = data.readFloat();
        this.xRot = data.readFloat();
        this.onGround = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleMovePlayerRot(this);
    }
}
