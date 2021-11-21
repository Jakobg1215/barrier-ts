import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerCombatEndPacket implements ClientboundPacket {
    public constructor(public killerId: number, public duration: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.duration).writeInt(this.killerId);
    }
}
