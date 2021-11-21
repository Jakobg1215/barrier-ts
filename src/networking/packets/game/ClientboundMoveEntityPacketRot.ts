import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPacketRot implements ClientboundPacket {
    public constructor(public entityId: number, public yRot: number, public xRot: number, public onGround: boolean) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeByte(this.yRot)
            .writeByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
