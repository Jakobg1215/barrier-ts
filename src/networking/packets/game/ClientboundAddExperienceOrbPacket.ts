import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddExperienceOrbPacket implements ClientboundPacket {
    public constructor(public id: number, public x: number, public y: number, public z: number, public value: number) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.id)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeVarInt(this.z)
            .writeShort(this.value);
    }
}
