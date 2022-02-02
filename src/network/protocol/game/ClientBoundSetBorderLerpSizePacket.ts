import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetBorderLerpSizePacket implements ClientBoundPacket {
    public constructor(public oldSize: number, public newSize: number, public lerpTime: bigint) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.oldSize);
        packet.writeDouble(this.newSize);
        packet.writeVarLong(this.lerpTime);
        return packet;
    }
}
