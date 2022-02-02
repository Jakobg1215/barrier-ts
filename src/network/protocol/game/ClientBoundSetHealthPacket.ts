import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetHealthPacket implements ClientBoundPacket {
    public constructor(public health: number, public food: number, public saturation: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeFloat(this.health);
        packet.writeVarInt(this.food);
        packet.writeFloat(this.saturation);
        return packet;
    }
}
