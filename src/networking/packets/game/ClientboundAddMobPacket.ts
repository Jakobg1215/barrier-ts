import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddMobPacket implements ClientboundPacket {
    public constructor(
        public id: number,
        public uuid: string,
        public type: number,
        public x: number,
        public y: number,
        public z: number,
        public xd: number,
        public yd: number,
        public zd: number,
        public yRot: number,
        public xRot: number,
        public yHeadRot: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.id)
            .writeUUID(this.uuid)
            .writeVarInt(this.type)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeByte(this.yRot)
            .writeByte(this.xRot)
            .writeByte(this.yHeadRot)
            .writeShort(this.xd)
            .writeShort(this.yd)
            .writeShort(this.zd);
    }
}
