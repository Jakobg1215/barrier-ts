import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAddExperienceOrbPacket implements ClientBoundPacket {
    public constructor(public id: number, public x: number, public y: number, public z: number, public value: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeShort(this.value);
        return packet;
    }
}
