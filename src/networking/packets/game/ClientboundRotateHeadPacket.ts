import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRotateHeadPacket implements ClientboundPacket {
    public readonly id: number = 62;
    public entityId: number;
    public yHeadRot: number;

    public constructor(entityId: number, yHeadRot: number) {
        this.entityId = entityId;
        this.yHeadRot = yHeadRot;
    }

    public write(): Packet {
        return new Packet().writeVarInt(this.entityId).writeUnsignedByte(this.yHeadRot);
    }
}
