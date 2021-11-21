import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveVehiclePacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeFloat(this.yRot)
            .writeFloat(this.xRot);
    }
}
