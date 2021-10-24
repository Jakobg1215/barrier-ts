import type GameProfile from '../../../types/GameProfile';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundGameProfilePacket implements ClientboundPacket {
    public readonly id: number = 2;
    public gameProfile: GameProfile;

    public constructor(gameProfile: GameProfile) {
        this.gameProfile = gameProfile;
    }

    public write(): Packet {
        return new Packet().writeUUID(this.gameProfile.uuid).writeString(this.gameProfile.name);
    }
}
