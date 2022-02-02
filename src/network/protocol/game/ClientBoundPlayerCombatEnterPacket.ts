import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerCombatEnterPacket implements ClientBoundPacket {
    public write(packet: DataBuffer): DataBuffer {
        return packet;
    }
}
