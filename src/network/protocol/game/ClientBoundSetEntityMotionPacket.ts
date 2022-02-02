import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetEntityMotionPacket implements ClientBoundPacket {
    public constructor(public id: number, public xa: number, public ya: number, public za: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeShort(this.xa);
        packet.writeShort(this.ya);
        packet.writeShort(this.za);
        return packet;
    }
}
