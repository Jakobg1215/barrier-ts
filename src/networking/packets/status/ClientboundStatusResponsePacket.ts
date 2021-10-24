import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundStatusResponsePacket implements ClientboundPacket {
    public readonly id: number = 0;
    public serverStatus: string; // TODO: Make use chat type

    public constructor(serverStatus: string) {
        this.serverStatus = serverStatus;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeString(this.serverStatus);
        return data;
    }
}
