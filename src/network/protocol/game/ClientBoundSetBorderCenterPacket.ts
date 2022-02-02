import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetBorderCenterPacket implements ClientBoundPacket {
    public constructor(public newCenterX: number, public newCenterZ: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.newCenterX);
        packet.writeDouble(this.newCenterZ);
        return packet;
    }
}
