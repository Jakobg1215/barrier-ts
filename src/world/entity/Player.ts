import Chat from '../../types/classes/Chat';
import type GameProfile from '../../types/GameProfile';
import BaseEntity from './BaseEntity';

export default class Player extends BaseEntity {
    private readonly playerGameProfile: GameProfile;
    private playerUserName: Chat;

    public constructor(gameProfile: GameProfile, id: number) {
        super(id);
        this.playerGameProfile = gameProfile;
        this.playerUserName = new Chat().addText(gameProfile.name, {});
    }

    public get gameProfile(): GameProfile {
        return this.playerGameProfile;
    }

    public get userName(): Chat {
        return this.playerUserName;
    }
}
