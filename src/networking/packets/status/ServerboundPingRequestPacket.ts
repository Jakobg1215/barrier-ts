import type Packet from '../../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPingRequestPacket implements ServerboundPacket {
    public time!: bigint;

    public read(data: Packet): this {
        this.time = data.readLong();
        return this;
    }
}
