import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundMovePlayerRotPacket implements ServerboundPacket {
    public yRot!: number;
    public xRot!: number;
    public onGround!: boolean;

    public read(data: Packet): this {
        this.yRot = data.readFloat();
        this.xRot = data.readFloat();
        this.onGround = data.readBoolean();
        return this;
    }
}
