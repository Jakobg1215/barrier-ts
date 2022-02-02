import type { Difficulty } from '../../../types/enums/Difficulty';
import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundChangeDifficultyPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly difficulty: Difficulty;

    public constructor(data: DataBuffer) {
        this.difficulty = data.readUnsignedByte();
    }

    public handle(handler: GamePacketListener): void {
        handler.handleChangeDifficulty(this);
    }
}
