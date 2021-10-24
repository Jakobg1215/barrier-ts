import type Packet from '../Packet';
import type ServerboundPacket from '../ServerboundPacket';

export default class ServerboundMoveVehiclePacket implements ServerboundPacket {
    public x!: number;
    public y!: number;
    public z!: number;
    public yRot!: number;
    public xRot!: number;

    public read(data: Packet): this {
        this.x = data.readDouble();
        this.y = data.readDouble();
        this.z = data.readDouble();
        this.yRot = data.readFloat();
        this.xRot = data.readFloat();
        return this;
    }
}
