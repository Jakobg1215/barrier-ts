import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLoginDisconnectPacket implements ClientboundPacket {
    public readonly id: number = 0;
    public reason: string; // TODO: Make use chat type

    public constructor(reason: string) {
        this.reason = reason;
    }

    public write(): Packet {
        return new Packet().writeString(this.reason);
    }
}
