import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetBorderCenterPacket implements ClientboundPacket {
    public constructor(public newCenterX: number, public newCenterZ: number) {}

    public write(): Packet {
        return new Packet().writeDouble(this.newCenterX).writeDouble(this.newCenterZ);
    }
}
