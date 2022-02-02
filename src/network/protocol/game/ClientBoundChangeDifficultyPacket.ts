import type { Difficulty } from '../../../types/enums/Difficulty';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundChangeDifficultyPacket implements ClientBoundPacket {
    public constructor(public difficulty: Difficulty, public locked: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUnsignedByte(this.difficulty);
        packet.writeBoolean(this.locked);
        return packet;
    }
}
