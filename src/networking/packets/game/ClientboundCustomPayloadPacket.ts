import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCustomPayloadPacket implements ClientboundPacket {
    public readonly id: number = 24;
    public identifier: string;
    public data: Buffer;

    public constructor(identifier: string, data: Buffer) {
        this.identifier = identifier;
        this.data = data;
    }

    public write(): Packet {
        const data = new Packet();
        data.writeString(this.identifier);
        data.append(this.data);
        return data;
    }
}
