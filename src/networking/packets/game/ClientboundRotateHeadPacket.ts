import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundRotateHeadPacket implements ClientboundPacket {
    public constructor(public entityId: number, public yHeadRot: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.entityId).writeByte(this.yHeadRot);
    }
}
