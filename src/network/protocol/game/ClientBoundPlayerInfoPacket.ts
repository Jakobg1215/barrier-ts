import type Chat from '../../../types/classes/Chat';
import type { GameType } from '../../../types/enums/GameType';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type GameProfile from '../login/GameProfile';
import type { property } from '../login/GameProfile';

export default class ClientBoundPlayerInfoPacket implements ClientBoundPacket {
    public constructor(public action: Action, public entries: PlayerUpdate[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.action);
        packet.writeVarInt(this.entries.length);
        switch (this.action) {
            case Action.ADD_PLAYER: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    packet.writeUUID(element.profile.id);
                    packet.writeString(element.profile.name);
                    packet.writeVarInt(element.profile.properties ? element.profile.properties.length : 0);
                    if (element.profile.properties) {
                        element.profile.properties.forEach((property: property): void => {
                            packet.writeString(property.name);
                            packet.writeString(property.value);
                            if (!property.signature) {
                                packet.writeBoolean(false);
                                return;
                            }
                            packet.writeBoolean(true);
                            packet.writeString(property.signature);
                        });
                    }
                    packet.writeVarInt(element.gameMode);
                    packet.writeVarInt(element.latency);
                    if (!element.displayName) {
                        packet.writeBoolean(false);
                        return;
                    }
                    packet.writeBoolean(true);
                    packet.writeChat(element.displayName);
                });
                break;
            }

            case Action.UPDATE_GAME_MODE: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    packet.writeUUID(element.profile.id);
                    packet.writeVarInt(element.gameMode);
                });
                break;
            }

            case Action.UPDATE_LATENCY: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    packet.writeUUID(element.profile.id);
                    packet.writeVarInt(element.latency);
                });
                break;
            }

            case Action.UPDATE_DISPLAY_NAME: {
                this.entries.forEach((element: PlayerUpdate): void => {
                    packet.writeUUID(element.profile.id);
                    if (!element.displayName) {
                        packet.writeBoolean(false);
                        return;
                    }
                    packet.writeBoolean(true);
                    packet.writeChat(element.displayName);
                });
                break;
            }

            case Action.REMOVE_PLAYER: {
                this.entries.forEach((element: PlayerUpdate) => {
                    packet.writeUUID(element.profile.id);
                });
                break;
            }
        }
        return packet;
    }
}

export enum Action {
    ADD_PLAYER,
    UPDATE_GAME_MODE,
    UPDATE_LATENCY,
    UPDATE_DISPLAY_NAME,
    REMOVE_PLAYER,
}

export interface PlayerUpdate {
    latency: number;
    gameMode: GameType;
    profile: GameProfile;
    displayName: Chat | null;
}
