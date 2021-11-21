import type { MobEffects } from '../../../types/enums/MobEffects';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRemoveMobEffectPacket implements ClientboundPacket {
    public constructor(public entityId: number, public effect: MobEffects) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.entityId).writeUnsignedByte(this.effect);
    }
}
