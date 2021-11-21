import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetHealthPacket implements ClientboundPacket {
    public constructor(public health: number, public food: number, public saturation: number) {}

    public write(): Packet {
        return new Packet().writeFloat(this.health).writeVarInt(this.food).writeFloat(this.saturation);
    }
}
