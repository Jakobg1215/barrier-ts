import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type GameProfile from './GameProfile';

export default class ClientBoundGameProfilePacket implements ClientBoundPacket {
    public constructor(public readonly gameProfile: GameProfile) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeUUID(this.gameProfile.id);
        packet.writeString(this.gameProfile.name, 16);
        return packet;
    }
}
