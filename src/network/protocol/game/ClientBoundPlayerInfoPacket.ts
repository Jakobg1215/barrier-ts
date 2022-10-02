import type Chat from '../../../types/classes/Chat';
import type { GameType } from '../../../types/enums/GameType';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type GameProfile from '../login/GameProfile';
import type { Buffer } from 'node:buffer';

export default class ClientBoundPlayerInfoPacket implements ClientBoundPacket {
    public constructor(public action: Action, public entries: PlayerUpdate[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.action);
        packet.writeVarInt(this.entries.length);
        switch (this.action) {
            case Action.ADD_PLAYER: {
                for (const element of this.entries) {
                    packet.writeUUID(element.profile.id);
                    packet.writeString(element.profile.name);
                    packet.writeVarInt(element.profile.properties ? element.profile.properties.length : 0);
                    if (element.profile.properties) {
                        for (const property of element.profile.properties) {
                            packet.writeString(property.name);
                            packet.writeString(property.value);
                            packet.writeBoolean(property.signature !== undefined);
                            if (property.signature) packet.writeString(property.signature);
                        }
                    }
                    packet.writeVarInt(element.gameMode);
                    packet.writeVarInt(element.latency);
                    packet.writeBoolean(element.displayName !== null);
                    if (element.displayName) packet.writeChat(element.displayName);
                    packet.writeBoolean(element.profilePublicKey !== null);
                    if (element.profilePublicKey) {
                        packet.writeLong(element.profilePublicKey.expiresAt);
                        packet.writeByteArray(element.profilePublicKey.key);
                        packet.writeByteArray(element.profilePublicKey.keySignature);
                    }
                }

                break;
            }

            case Action.UPDATE_GAME_MODE: {
                for (const element of this.entries) {
                    packet.writeUUID(element.profile.id);
                    packet.writeVarInt(element.gameMode);
                }
                break;
            }

            case Action.UPDATE_LATENCY: {
                for (const element of this.entries) {
                    packet.writeUUID(element.profile.id);
                    packet.writeVarInt(element.latency);
                }
                break;
            }

            case Action.UPDATE_DISPLAY_NAME: {
                for (const element of this.entries) {
                    packet.writeUUID(element.profile.id);
                    if (!element.displayName) {
                        packet.writeBoolean(false);
                        continue;
                    }
                    packet.writeBoolean(true);
                    packet.writeChat(element.displayName);
                }
                break;
            }

            case Action.REMOVE_PLAYER: {
                for (const element of this.entries) {
                    packet.writeUUID(element.profile.id);
                }
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
    profilePublicKey: {
        expiresAt: bigint;
        key: Buffer;
        keySignature: Buffer;
    } | null;
}
