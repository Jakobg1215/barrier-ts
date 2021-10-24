import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundSelectTradePacket implements ServerboundPacket {
    public item!: number;

    public read(data: Packet): this {
        this.item = data.readVarInt();
        return this;
    }
}
