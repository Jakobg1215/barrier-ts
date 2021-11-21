import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundContainerClosePacket implements ClientboundPacket {
    public constructor(public containerId: number) {}

    public write(): Packet {
        return new Packet().writeUnsignedByte(this.containerId);
    }
}
