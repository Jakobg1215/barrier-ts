import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCustomPayloadPacket implements ClientboundPacket {
    public constructor(public identifier: string, public data: Buffer) {}

    public write(): Packet {
        return new Packet().writeIdentifier(this.identifier).append(this.data);
    }
}
