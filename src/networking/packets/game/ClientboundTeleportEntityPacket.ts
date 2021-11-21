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
            .writeUnsignedByte(this.yRot)
            .writeUnsignedByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
