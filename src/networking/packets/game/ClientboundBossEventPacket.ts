import type Chat from '../../../types/classes/Chat';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundBossEventPacket implements ClientboundPacket {
    public constructor(public id: string, public operation: Operation) {}

    public write(): Packet {
        const data: Packet = new Packet().writeUUID(this.id).writeVarInt(this.operation.type);

        switch (this.operation.type) {
            case OperationType.ADD: {
                if (!this.operation.name) throw new Error('Missing name for operation');
                if (!this.operation.progress) throw new Error('Missing progress for operation');
                if (!this.operation.color) throw new Error('Missing color for operation');
                if (!this.operation.overlay) throw new Error('Missing overlay for operation');
                if (!this.operation.darkenScreen) throw new Error('Missing darkenScreen for operation');
                if (!this.operation.playMusic) throw new Error('Missing playMusic for operation');
                if (!this.operation.createWorldFog) throw new Error('Missing createWorldFog for operation');
                let encodeProperties: number = 0;
                encodeProperties |= this.operation.darkenScreen ? 1 : 0;
                encodeProperties |= this.operation.playMusic ? 2 : 0;
                encodeProperties |= this.operation.createWorldFog ? 4 : 0;
                return data
                    .writeChat(this.operation.name)
                    .writeFloat(this.operation.progress)
                    .writeVarInt(this.operation.color)
                    .writeVarInt(this.operation.overlay)
                    .writeUnsignedByte(encodeProperties);
            }

            case OperationType.REMOVE: {
                return data;
            }

            case OperationType.UPDATE_PROGRESS: {
                if (!this.operation.progress) throw new Error('Missing progress for operation');
                return data.writeFloat(this.operation.progress);
            }

            case OperationType.UPDATE_NAME: {
                if (!this.operation.name) throw new Error('Missing name for operation');
                return data.writeChat(this.operation.name);
            }

            case OperationType.UPDATE_STYLE: {
                if (!this.operation.color) throw new Error('Missing color for operation');
                if (!this.operation.overlay) throw new Error('Missing overlay for operation');
                return data.writeVarInt(this.operation.color).writeVarInt(this.operation.overlay);
            }

            case OperationType.UPDATE_PROPERTIES: {
                if (!this.operation.darkenScreen) throw new Error('Missing darkenScreen for operation');
                if (!this.operation.playMusic) throw new Error('Missing playMusic for operation');
                if (!this.operation.createWorldFog) throw new Error('Missing createWorldFog for operation');
                let encodeProperties: number = 0;
                encodeProperties |= this.operation.darkenScreen ? 1 : 0;
                encodeProperties |= this.operation.playMusic ? 2 : 0;
                encodeProperties |= this.operation.createWorldFog ? 4 : 0;
                return data.writeUnsignedByte(encodeProperties);
            }

            default: {
                throw new Error('Invalid Type');
            }
        }
    }
}

export interface Operation {
    type: OperationType;
    name?: Chat;
    progress?: number;
    color?: BossBarColor;
    overlay?: BossBarOverlay;
    darkenScreen?: boolean;
    playMusic?: boolean;
    createWorldFog?: boolean;
}

export enum OperationType {
    ADD,
    REMOVE,
    UPDATE_PROGRESS,
    UPDATE_NAME,
    UPDATE_STYLE,
    UPDATE_PROPERTIES,
}

export enum BossBarColor {
    PINK,
    BLUE,
    RED,
    GREEN,
    YELLOW,
    PURPLE,
    WHITE,
}

export enum BossBarOverlay {
    PROGRESS,
    NOTCHED_6,
    NOTCHED_10,
    NOTCHED_12,
    NOTCHED_20,
}
