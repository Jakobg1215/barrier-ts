import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPongPacket implements ServerboundPacket {
    public id!: number;

    public read(data: Packet): this {
        this.id = data.readInt();
        return this;
    }
}
