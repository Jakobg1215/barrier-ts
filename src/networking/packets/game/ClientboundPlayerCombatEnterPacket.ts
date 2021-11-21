import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerCombatEnterPacket implements ClientboundPacket {
    public write(): Packet {
        return new Packet();
    }
}
