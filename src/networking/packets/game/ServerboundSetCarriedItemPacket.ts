import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSetCarriedItemPacket implements ServerboundPacket {
    public slot!: number;

    public read(data: Packet): this {
        this.slot = data.readShort();
        return this;
    }
}
