import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundGameEventPacket implements ClientboundPacket {
    public constructor(public event: Type, public param: number) {}

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.event).writeFloat(this.param);
    }
}

export enum Type {
    NO_RESPAWN_BLOCK_AVAILABLE,
    START_RAINING,
    STOP_RAINING,
    CHANGE_GAME_MODE,
    WIN_GAME,
    DEMO_EVENT,
    ARROW_HIT_PLAYER,
    RAIN_LEVEL_CHANGE,
    THUNDER_LEVEL_CHANGE,
    PUFFER_FISH_STING,
    GUARDIAN_ELDER_EFFECT,
    IMMEDIATE_RESPAWN,
}
