import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetBorderWarningDistancePacket implements ClientboundPacket {
    public constructor(public warningBlocks: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.warningBlocks);
    }
}
