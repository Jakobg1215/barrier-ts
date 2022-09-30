import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCustomQueryPacket implements ClientBoundPacket {
    public constructor(public readonly transactionId: number, public readonly identifier: NameSpace, public readonly data: DataBuffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.transactionId);
        packet.writeNameSpace(this.identifier);
        packet.writeBytes(this.data.getReadableBytes());
        return packet;
    }
}
