import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundContainerClosePacket implements ServerboundPacket {
    public containerId!: number;

    public read(data: Packet): this {
        this.containerId = data.readByte();
        return this;
    }
}
