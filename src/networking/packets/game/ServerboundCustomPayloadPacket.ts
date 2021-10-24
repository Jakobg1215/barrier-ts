import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundCustomPayloadPacket implements ServerboundPacket {
    public identifier!: string;
    public data!: Buffer;

    public read(data: Packet): this {
        this.identifier = data.readString();
        this.data = data.getReadableBytes();
        return this;
    }
}
