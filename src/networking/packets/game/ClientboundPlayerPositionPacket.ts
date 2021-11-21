import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundPlayerPositionPacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
        public relativeArguments: number,
        public id: number,
        public dismountVehicle: boolean,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeFloat(this.yRot)
            .writeFloat(this.xRot)
            .writeByte(this.relativeArguments)
            .writeVarInt(this.id)
            .writeBoolean(this.dismountVehicle);
    }
}
