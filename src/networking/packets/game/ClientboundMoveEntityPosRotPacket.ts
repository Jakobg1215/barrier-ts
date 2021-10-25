import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPosRotPacket implements ClientboundPacket {
    public readonly id: number = 42;
    public entityId: number;
    public xa: number;
    public ya: number;
    public za: number;
    public yRot: number;
    public xRot: number;
    public onGround: boolean;

    public constructor(
        entityId: number,
        xa: number,
        ya: number,
        za: number,
        yRot: number,
        xRot: number,
        onGround: boolean,
    ) {
        this.entityId = entityId;
        this.xa = xa;
        this.ya = ya;
        this.za = za;
        this.yRot = yRot;
        this.xRot = xRot;
        this.onGround = onGround;
    }

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeShort(this.xa)
            .writeShort(this.ya)
            .writeShort(this.za)
            .writeUnsignedByte(this.yRot)
            .writeUnsignedByte(this.xRot)
            .writeBoolean(this.onGround);
    }
}
