import type DataBuffer from '../../DataBuffer';
import type GamePacketListener from '../../GamePacketListener';
import type ServerBoundPacket from '../ServerBoundPacket';

export default class ServerBoundPlayerCommandPacket implements ServerBoundPacket<GamePacketListener> {
    public readonly id: number;
    public readonly action: Action;
    public readonly data: number;

    public constructor(data: DataBuffer) {
        this.id = data.readVarInt();
        this.action = data.readVarInt();
        this.data = data.readVarInt();
    }

    public handle(handler: GamePacketListener): void {
        handler.handlePlayerCommand(this);
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
