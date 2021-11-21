import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundStatusResponsePacket implements ClientboundPacket {
    public constructor(public serverStatus: string) {}

    public write(): Packet {
        return new Packet().writeString(this.serverStatus);
    }
}
