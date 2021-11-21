import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetBorderSizePacket implements ClientboundPacket {
    public constructor(public size: number) {}

    public write(): Packet {
        return new Packet().writeDouble(this.size);
    }
}
