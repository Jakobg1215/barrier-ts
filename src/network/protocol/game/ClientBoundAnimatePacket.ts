import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAnimatePacket implements ClientBoundPacket {
    public constructor(public id: number, public action: Action) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeUnsignedByte(this.action);
        return packet;
    }
}

export enum Action {
    SWING_MAIN_HAND,
    HURT,
    WAKE_UP,
    SWING_OFF_HAND,
    CRITICAL_HIT,
    MAGIC_CRITICAL_HIT,
}
