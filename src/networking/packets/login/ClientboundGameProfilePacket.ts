import type GameProfile from '../../../types/GameProfile';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundGameProfilePacket implements ClientboundPacket {
    public constructor(public gameProfile: GameProfile) {}

    public write(): Packet {
        return new Packet().writeUUID(this.gameProfile.uuid).writeString(this.gameProfile.name);
    }
}
