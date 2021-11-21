import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundKeepAlivePacket implements ClientboundPacket {
    public constructor(public id: bigint) {}

    public write(): Packet {
        return new Packet().writeLong(this.id);
    }
}
