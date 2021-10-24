import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundChatPacket implements ServerboundPacket {
    public message!: string;

    public read(data: Packet): this {
        this.message = data.readString();
        return this;
    }
}
