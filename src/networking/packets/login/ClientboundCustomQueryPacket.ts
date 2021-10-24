import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundCustomQueryPacket implements ClientboundPacket {
    public readonly id: number = 4;
    public transactionId: number;
    public identifier: string;
    public data: Packet;

    public constructor(transactionId: number, identifier: string, data: Packet) {
        this.transactionId = transactionId;
        this.identifier = identifier;
        this.data = data;
    }

    public write(): Packet {
        return new Packet().writeVarInt(this.transactionId).writeIdentifier(this.identifier).writeBytes(this.data);
    }
}
