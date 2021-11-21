import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPacketPosRot implements ClientboundPacket {
    public constructor(
        public entityId: number,
        public xa: number,
        public ya: number,
        public za: number,
        public yRot: number,
        public xRot: number,
        public onGround: boolean,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeShort(this.xa)
            .writeShort(this.ya)
            .writeShort(this.za)
            .writeByte(this.yRot)
            .writeByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
