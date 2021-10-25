import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundTeleportEntityPacket implements ClientboundPacket {
    public readonly id: number = 97;
    public entityId: number;
    public x: number;
    public y: number;
    public z: number;
    public yRot: number;
    public xRot: number;
    public onGround: boolean;

    public constructor(
        entityId: number,
        x: number,
        y: number,
        z: number,
        yRot: number,
        xRot: number,
        onGround: boolean,
    ) {
        this.entityId = entityId;
        this.x = x;
        this.y = y;
        this.z = z;
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
