import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddEntityPacket implements ClientboundPacket {
    public constructor(
        public id: number,
        public uuid: string,
        public x: number,
        public y: number,
        public z: number,
        public xa: number,
        public ya: number,
        public za: number,
        public xRot: number,
        public yRot: number,
        public type: number,
        public data: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.id)
            .writeUUID(this.uuid)
            .writeVarInt(this.type)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeByte(this.xRot)
            .writeByte(this.yRot)
            .writeInt(this.data)
            .writeShort(this.xa)
            .writeShort(this.ya)
            .writeShort(this.za);
    }
}
