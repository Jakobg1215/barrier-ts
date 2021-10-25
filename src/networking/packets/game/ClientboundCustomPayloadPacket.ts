import type { Buffer } from 'node:buffer';
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
        return new Packet().writeString(this.identifier).append(this.data);
    }
}
