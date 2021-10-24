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
        const data = new Packet();
        data.writeUUID(this.gameProfile.uuid);
        data.writeString(this.gameProfile.name);
        return data;
    }
}
