import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetEntityLinkPacket implements ClientboundPacket {
    public constructor(public sourceId: number, public destId: number) {}

    public write(): Packet {
        return new Packet().writeInt(this.sourceId).writeInt(this.destId);
    }
}
