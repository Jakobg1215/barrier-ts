import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundPaddleBoatPacket implements ServerboundPacket {
    public left!: boolean;
    public right!: boolean;

    public read(data: Packet): this {
        this.left = data.readBoolean();
        this.right = data.readBoolean();
        return this;
    }
}
