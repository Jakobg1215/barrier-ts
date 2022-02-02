import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundMovePlayerStatusOnlyPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly onGround: boolean;

    public constructor(data: DataBuffer) {
        this.onGround = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleMovePlayerStatusOnly(this);
    }
}
