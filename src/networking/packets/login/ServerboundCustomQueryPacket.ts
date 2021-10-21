import Packet from '../../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundCustomQueryPacket implements ServerboundPacket {
    public transactionId!: number;
    public data!: Packet | null;

    public read(data: Packet): this {
        this.transactionId = data.readVarInt();
        if (data.readBoolean()) {
            this.data = new Packet(data.getReadableBytes());
            return this;
        }
        this.data = null;
        return this;
    }
}
