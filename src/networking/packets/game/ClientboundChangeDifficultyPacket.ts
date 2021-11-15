import type { Difficulty } from '../../../types/enums/Difficulty';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundChangeDifficultyPacket implements ClientboundPacket {
    public readonly id: number = 14;
    public difficulty: Difficulty;
    public locked: boolean;

    public constructor(difficulty: Difficulty, locked: boolean) {
        this.difficulty = difficulty;
        this.locked = locked;
    }

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.difficulty).writeBoolean(this.locked);
    }
}
