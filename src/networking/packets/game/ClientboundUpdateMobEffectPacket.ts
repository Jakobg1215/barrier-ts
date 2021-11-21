import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundUpdateMobEffectPacket implements ClientboundPacket {
    public constructor(
        public entityId: number,
        public effectId: number,
        public effectAmplifier: number,
        public effectDurationTicks: number,
        public flags: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeByte(this.effectId)
            .writeByte(this.effectAmplifier)
            .writeVarInt(this.effectDurationTicks)
            .writeByte(this.flags);
    }
}
