import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetBorderLerpSizePacket implements ClientboundPacket {
    public constructor(public oldSize: number, public newSize: number, public lerpTime: bigint) {}

    public write(): Packet {
        return new Packet().writeDouble(this.oldSize).writeDouble(this.newSize).writeVarLong(this.lerpTime);
    }
}
