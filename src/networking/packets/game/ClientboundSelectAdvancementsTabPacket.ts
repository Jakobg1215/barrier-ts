import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSelectAdvancementsTabPacket implements ClientboundPacket {
    public constructor(public tab: string | null) {}

    public write(): Packet {
        if (this.tab === null) return new Packet().writeBoolean(false);
        return new Packet().writeBoolean(true).writeIdentifier(this.tab);
    }
}
