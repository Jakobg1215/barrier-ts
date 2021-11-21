import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetExperiencePacket implements ClientboundPacket {
    public constructor(
        public experienceProgress: number,
        public totalExperience: number,
        public experienceLevel: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeFloat(this.experienceProgress)
            .writeVarInt(this.experienceLevel)
            .writeVarInt(this.totalExperience);
    }
}
