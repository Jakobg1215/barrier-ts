import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetCarriedItemPacket implements ClientboundPacket {
    public constructor(public slot: number) {}

    public write(): Packet {
        return new Packet().writeByte(this.slot);
    }
}
