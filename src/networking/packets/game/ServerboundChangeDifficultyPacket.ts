import type { Difficulty } from '../../../types/enums/Difficulty';
import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundChangeDifficultyPacket implements ServerboundPacket {
    public difficulty!: Difficulty;

    public read(data: Packet): this {
        this.difficulty = data.readUnsignedByte();
        return this;
    }
}
