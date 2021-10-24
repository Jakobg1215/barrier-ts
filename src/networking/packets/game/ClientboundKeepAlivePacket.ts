import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundKeepAlivePacket implements ClientboundPacket {
    public readonly id: number = 33;
    public identifier!: bigint;

    public constructor(id: bigint) {
        this.identifier = id;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeLong(this.identifier);
        return data;
    }
}
