import type GameProfile from '../../types/GameProfile';

export default class Player {
    private readonly playerGameProfile: GameProfile;
    private playerUserName: string; // TODO: Make use chat type
    private playerProperties: object[] = [];

    public constructor(gameProfile: GameProfile) {
        this.playerGameProfile = gameProfile;
        this.playerUserName = JSON.stringify({ text: this.playerGameProfile.name });
    }

    public setProperties(properties: object[]) {
        this.playerProperties = properties;
    }

    public get gameProfile(): GameProfile {
        return this.playerGameProfile;
    }

    public get userName(): string {
        return this.playerUserName;
    }

    public get properties(): object[] {
        return this.playerProperties;
    }
}
