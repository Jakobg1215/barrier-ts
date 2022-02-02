import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundForgetLevelChunkPacket implements ClientBoundPacket {
    public constructor(public x: number, public z: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.x);
        packet.writeInt(this.z);
        return packet;
    }
}
