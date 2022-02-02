import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundLockDifficultyPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly locked: boolean;

    public constructor(data: DataBuffer) {
        this.locked = data.readBoolean();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleLockDifficulty(this);
    }
}
