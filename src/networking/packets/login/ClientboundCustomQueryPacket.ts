import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCustomQueryPacket implements ClientboundPacket {
    public constructor(public transactionId: number, public identifier: string, public data: Packet) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.transactionId).writeIdentifier(this.identifier).writeBytes(this.data);
    }
}
