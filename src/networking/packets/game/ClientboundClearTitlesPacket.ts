import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundClearTitlesPacket implements ClientboundPacket {
    public constructor(public resetTimes: boolean) {}

    public write(): Packet {
        return new Packet().writeBoolean(this.resetTimes);
    }
}
