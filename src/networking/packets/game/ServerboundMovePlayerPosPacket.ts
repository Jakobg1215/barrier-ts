import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundMovePlayerPosPacket implements ServerboundPacket {
    public x!: number;
    public y!: number;
    public z!: number;
    public onGround!: boolean;

    public read(data: Packet): this {
        this.x = data.readDouble();
        this.y = data.readDouble();
        this.z = data.readDouble();
        this.onGround = data.readBoolean();
        return this;
    }
}
