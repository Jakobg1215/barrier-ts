import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetBorderSizePacket implements ClientBoundPacket {
    public constructor(public size: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.size);
        return packet;
    }
}
