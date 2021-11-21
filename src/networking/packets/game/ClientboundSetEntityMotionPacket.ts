import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetEntityMotionPacket implements ClientboundPacket {
    public constructor(public id: number, public xa: number, public ya: number, public za: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.id).writeShort(this.xa).writeShort(this.ya).writeShort(this.za);
    }
}
