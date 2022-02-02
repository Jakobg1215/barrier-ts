import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerCombatEndPacket implements ClientBoundPacket {
    public constructor(public killerId: number, public duration: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.duration);
        packet.writeInt(this.killerId);
        return packet;
    }
}
