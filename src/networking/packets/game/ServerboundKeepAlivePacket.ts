import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundKeepAlivePacket implements ServerboundPacket {
    public id!: bigint;

    public read(data: Packet): this {
        this.id = data.readLong();
        return this;
    }
}
