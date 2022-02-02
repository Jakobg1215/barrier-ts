import type { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundTagQueryPacket implements ClientBoundPacket {
    public constructor(public transactionId: number, public tag: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.transactionId);
        packet.writeNbt(this.tag);
        return packet;
    }
}
