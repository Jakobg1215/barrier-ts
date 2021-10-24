import Vector3 from '../../types/classes/Vector3';
import type GameProfile from '../../types/GameProfile';

export default class Player {
    private readonly playerGameProfile: GameProfile;
    private playerUserName: string; // TODO: Make use chat type
    private readonly playerPosition: Vector3 = Vector3.zero();

    public constructor(gameProfile: GameProfile) {
        this.playerGameProfile = gameProfile;
        this.playerUserName = JSON.stringify({ text: this.playerGameProfile.name });
    }

    public updatePosition(pos: Vector3): this {
        this.playerPosition.setCoordinates(pos);
        return this;
    }

    public get gameProfile(): GameProfile {
        return this.playerGameProfile;
    }

    public get userName(): string {
        return this.playerUserName;
    }

    public get position(): Vector3 {
        return this.playerPosition;
    }
}
