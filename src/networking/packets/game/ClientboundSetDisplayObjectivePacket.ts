import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetDisplayObjectivePacket implements ClientboundPacket {
    public constructor(public slot: number, public objectiveName: string) {}

    public write(): Packet {
        return new Packet().writeByte(this.slot).writeString(this.objectiveName);
    }
}
