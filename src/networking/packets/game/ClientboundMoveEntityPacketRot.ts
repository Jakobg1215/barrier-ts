import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPacketRot implements ClientboundPacket {
    public constructor(public entityId: number, public yRot: number, public xRot: number, public onGround: boolean) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeUnsignedByte(this.yRot)
            .writeUnsignedByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
