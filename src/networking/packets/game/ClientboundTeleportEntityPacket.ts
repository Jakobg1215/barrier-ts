import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundTeleportEntityPacket implements ClientboundPacket {
    public constructor(
        public id: number,
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
        public onGround: boolean,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.id)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeByte(this.yRot)
            .writeByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
