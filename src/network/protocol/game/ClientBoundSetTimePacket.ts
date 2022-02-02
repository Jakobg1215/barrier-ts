import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetTimePacket implements ClientBoundPacket {
    public constructor(public gameTime: bigint, public dayTime: bigint) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeLong(this.gameTime);
        packet.writeLong(this.dayTime);
        return packet;
    }
}
