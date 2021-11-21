import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundTagQueryPacket implements ClientboundPacket {
    public constructor(public transactionId: number, public tag: Buffer) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.transactionId).writeNbt(this.tag);
    }
}
