import type Chat from '../../../types/classes/Chat';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerCombatKillPacket implements ClientBoundPacket {
    public constructor(public playerId: number, public killerId: number, public message: Chat) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.playerId);
        packet.writeInt(this.killerId);
        packet.writeChat(this.message);
        return packet;
    }
}
