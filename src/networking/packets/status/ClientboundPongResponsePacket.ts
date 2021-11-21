import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPongResponsePacket implements ClientboundPacket {
    public constructor(public time: bigint) {}

    public write(): Packet {
        return new Packet().writeLong(this.time);
    }
}
