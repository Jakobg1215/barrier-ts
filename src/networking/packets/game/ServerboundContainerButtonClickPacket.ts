import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundContainerButtonClickPacket implements ServerboundPacket {
    public containerId!: number;
    public buttonId!: number;

    public read(data: Packet): this {
        this.containerId = data.readByte();
        this.buttonId = data.readByte();
        return this;
    }
}
