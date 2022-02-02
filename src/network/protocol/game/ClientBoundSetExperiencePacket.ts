import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetExperiencePacket implements ClientBoundPacket {
    public constructor(
        public experienceProgress: number,
        public totalExperience: number,
        public experienceLevel: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeFloat(this.experienceProgress);
        packet.writeVarInt(this.experienceLevel);
        packet.writeVarInt(this.totalExperience);
        return packet;
    }
}
