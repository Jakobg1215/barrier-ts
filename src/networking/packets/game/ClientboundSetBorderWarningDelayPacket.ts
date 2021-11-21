import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetBorderWarningDelayPacket implements ClientboundPacket {
    public constructor(public warningDelay: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.warningDelay);
    }
}
