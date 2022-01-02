import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPlayerCommandPacket implements ServerboundPacket {
    public id!: number;
    public action!: Action;
    public data!: number;

    public read(data: Packet): this {
        this.id = data.readVarInt();
        this.action = data.readVarInt();
        this.data = data.readVarInt();
        return this;
    }
}

export enum Action {
    PRESS_SHIFT_KEY,
    RELEASE_SHIFT_KEY,
    STOP_SLEEPING,
    START_SPRINTING,
    STOP_SPRINTING,
    START_RIDING_JUMP,
    STOP_RIDING_JUMP,
    OPEN_INVENTORY,
    START_FALL_FLYING,
}
