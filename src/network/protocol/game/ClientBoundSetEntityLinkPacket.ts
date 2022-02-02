import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetEntityLinkPacket implements ClientBoundPacket {
    public constructor(public sourceId: number, public destId: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.sourceId);
        packet.writeInt(this.destId);
        return packet;
    }
}
