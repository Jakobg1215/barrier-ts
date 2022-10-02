import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCustomQueryPacket implements ClientBoundPacket {
    private static MAX_PAYLOAD_SIZE = 1048576;

    public constructor(public readonly transactionId: number, public readonly identifier: NameSpace, public readonly data: DataBuffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.transactionId);
        packet.writeNameSpace(this.identifier);
        if (this.data.buffer.length >= ClientBoundCustomQueryPacket.MAX_PAYLOAD_SIZE)
            throw new Error(`Payload may not be larger than ${ClientBoundCustomQueryPacket.MAX_PAYLOAD_SIZE} bytes`);
        packet.writeBytes(this.data.getReadableBytes());
        return packet;
    }
}
