import Packet from '../../Packet';
import type ClientboundPacket from '../ClientbountPacket';

export default class ClientboundLoginDisconnectPacket implements ClientboundPacket {
    public readonly id: number = 0;
    public reason: string; // TODO: Make use chat type

    public constructor(reason: string) {
        this.reason = reason;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeString(this.reason);
        return data;
    }
}
