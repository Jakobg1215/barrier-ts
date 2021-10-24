import type { GameType } from '../../../types/enums/GameType';
import type GameProfile from '../../../types/GameProfile';
import type { property } from '../../../types/GameProfile';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerInfoPacket implements ClientboundPacket {
    public readonly id: number = 54;
    public action: Action;
    public entries: PlayerUpdate[];

    public constructor(action: Action, entries: PlayerUpdate[]) {
        this.action = action;
        this.entries = entries;
    }

    public write(): Packet {
        const data = new Packet().writeVarInt(this.action).writeVarInt(this.entries.length);
        switch (this.action) {
            case Action.ADD_PLAYER: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    data.writeUUID(element.profile.uuid)
                        .writeString(element.profile.name)
                        .writeVarInt(element.profile.properties ? element.profile.properties.length : 0);
                    if (element.profile.properties) {
                        element.profile.properties.forEach((property: property): void => {
                            data.writeString(property.name).writeString(property.value);
                            if (!property.signature) {
                                data.writeBoolean(false);
                                return;
                            }
                            data.writeBoolean(true).writeString(property.signature);
                        });
                    }
                    data.writeVarInt(element.gameMode).writeVarInt(element.latency);
                    if (!element.displayName) {
                        data.writeBoolean(false);
                        return;
                    }
                    data.writeBoolean(true).writeString(element.displayName);
                });
                break;
            }

            case Action.UPDATE_GAME_MODE: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    data.writeUUID(element.profile.uuid).writeVarInt(element.gameMode);
                });
                break;
            }

            case Action.UPDATE_LATENCY: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    data.writeUUID(element.profile.uuid).writeVarInt(element.latency);
                });
                break;
            }

            case Action.UPDATE_DISPLAY_NAME: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    data.writeUUID(element.profile.uuid);
                    if (!element.displayName) {
                        data.writeBoolean(false);
                        return;
                    }
                    data.writeBoolean(true).writeString(element.displayName);
                });
                break;
            }

            case Action.REMOVE_PLAYER: {
                this.entries.forEach((element: PlayerUpdate) => {
                    data.writeUUID(element.profile.uuid);
                });
                break;
            }
        }
        return data;
    }
}

enum Action {
    ADD_PLAYER,
    UPDATE_GAME_MODE,
    UPDATE_LATENCY,
    UPDATE_DISPLAY_NAME,
    REMOVE_PLAYER,
}

interface PlayerUpdate {
    latency: number;
    gameMode: GameType;
    profile: GameProfile;
    displayName: string | null; // TODO: use type chat
}
