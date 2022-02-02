import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundUpdateMobEffectPacket implements ClientBoundPacket {
    public constructor(
        public entityId: number,
        public effectId: number,
        public effectAmplifier: number,
        public effectDurationTicks: number,
        public flags: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeByte(this.effectId);
        packet.writeByte(this.effectAmplifier);
        packet.writeVarInt(this.effectDurationTicks);
        packet.writeByte(this.flags);
        return packet;
    }
}
