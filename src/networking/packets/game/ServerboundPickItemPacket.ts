import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPickItemPacket implements ServerboundPacket {
    public slot!: number;

    public read(data: Packet): this {
        this.slot = data.readVarInt();
        return this;
    }
}
