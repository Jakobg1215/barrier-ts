import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
import type ServerStatus from './ServerStatus';

export default class ClientBoundStatusResponsePacket implements ClientBoundPacket {
    public constructor(public readonly status: ServerStatus) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeString(JSON.stringify(this.status));
        return packet;
    }
}
