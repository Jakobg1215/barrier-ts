import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundMovePlayerStatusOnlyPacket implements ServerboundPacket {
    public onGround!: boolean;

    public read(data: Packet): this {
        this.onGround = data.readBoolean();
        return this;
    }
}
