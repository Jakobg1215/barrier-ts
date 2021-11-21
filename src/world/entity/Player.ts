import Chat from '../../types/classes/Chat';
import type Slot from '../../types/classes/Slot';
import type GameProfile from '../../types/GameProfile';
import BaseEntity from './BaseEntity';

export default class Player extends BaseEntity {
    private readonly playerGameProfile: GameProfile;
    private playerUserName: Chat;
    public isFlying: boolean = false;
    public inventory: Map<number, Slot> = new Map();
    public heldItemSlot: number = 36;

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
