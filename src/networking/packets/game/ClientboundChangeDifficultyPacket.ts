import type { Difficulty } from '../../../types/enums/Difficulty';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundChangeDifficultyPacket implements ClientboundPacket {
    public constructor(public difficulty: Difficulty, public locked: boolean) {}

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.difficulty).writeBoolean(this.locked);
    }
}
