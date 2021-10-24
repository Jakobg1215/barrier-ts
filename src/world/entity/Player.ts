import type GameProfile from '../../types/GameProfile';
import BaseEntity from './BaseEntity';

export default class Player extends BaseEntity {
    private readonly playerGameProfile: GameProfile;
    private playerUserName: string; // TODO: Make use chat type

    public constructor(gameProfile: GameProfile, id: number) {
        super(id);
        this.playerGameProfile = gameProfile;
        this.playerUserName = JSON.stringify({ text: this.playerGameProfile.name });
    }

    public get gameProfile(): GameProfile {
        return this.playerGameProfile;
    }

    public get userName(): string {
        return this.playerUserName;
    }
}
