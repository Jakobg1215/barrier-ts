import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityRotPacket implements ClientboundPacket {
    public readonly id: number = 43;
    public entityId: number;
    public yRot: number;
    public xRot: number;
    public onGround: boolean;

    public constructor(entityId: number, yRot: number, xRot: number, onGround: boolean) {
        this.entityId = entityId;
        this.yRot = yRot;
        this.xRot = xRot;
        this.onGround = onGround;
    }

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeUnsignedByte(this.yRot)
            .writeUnsignedByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
