import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPongResponsePacket implements ClientboundPacket {
    public readonly id: number = 1;
    public time: bigint;

    public constructor(time: bigint) {
        this.time = time;
    }

    public write(): Packet {
        return new Packet().writeLong(this.time);
    }
}
