import type { Buffer } from 'node:buffer';
import type NameSpace from '../../../types/classes/NameSpace';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundCustomPayloadPacket implements ClientBoundPacket {
    public constructor(public identifier: NameSpace, public data: Buffer) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeNameSpace(this.identifier).append(this.data);
        return packet;
    }
}
