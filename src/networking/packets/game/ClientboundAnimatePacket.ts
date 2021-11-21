import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAnimatePacket implements ClientboundPacket {
    public constructor(public id: number, public action: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.id).writeUnsignedByte(this.action);
    }
}
