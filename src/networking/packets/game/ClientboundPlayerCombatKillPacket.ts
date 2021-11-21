import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerCombatKillPacket implements ClientboundPacket {
    public constructor(public playerId: number, public killerId: number, public message: Chat) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.playerId).writeInt(this.killerId).writeChat(this.message);
    }
}
