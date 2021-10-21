import Packet from '../../Packet';
import type ClientboundPacket from '../ClientbountPacket';

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
        const data = new Packet();
        data.writeVarInt(this.transactionId);
        data.writeIdentifier(this.identifier);
        data.writeBytes(this.data);
        return data;
    }
}
