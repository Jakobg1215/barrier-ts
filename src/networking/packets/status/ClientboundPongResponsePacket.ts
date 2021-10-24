import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPongResponsePacket implements ClientboundPacket {
    public readonly id: number = 1;
    public time: bigint;

    public constructor(time: bigint) {
        this.time = time;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeLong(this.time);
        return data;
    }
}
