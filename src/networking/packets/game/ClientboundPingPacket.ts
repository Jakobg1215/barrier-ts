import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPingPacket implements ClientboundPacket {
    public constructor(public id: number) {}

    public write(): Packet {
        return new Packet().writeInt(this.id);
    }
}
