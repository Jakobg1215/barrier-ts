import type { MobEffects } from '../../../types/enums/MobEffects';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRemoveMobEffectPacket implements ClientBoundPacket {
    public constructor(public entityId: number, public effect: MobEffects) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeVarInt(this.effect);
        return packet;
    }
}
