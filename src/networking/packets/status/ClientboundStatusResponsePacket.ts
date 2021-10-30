import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundStatusResponsePacket implements ClientboundPacket {
    public readonly id: number = 0;
    public serverStatus: string;

    public constructor(serverStatus: string) {
        this.serverStatus = serverStatus;
    }

    public write(): Packet {
        return new Packet().writeString(this.serverStatus);
    }
}
