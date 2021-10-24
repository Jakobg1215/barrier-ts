import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundEntityTagQuery implements ServerboundPacket {
    public transactionId!: number;
    public entityId!: number;

    public read(data: Packet): this {
        this.transactionId = data.readVarInt();
        this.entityId = data.readVarInt();
        return this;
    }
}
