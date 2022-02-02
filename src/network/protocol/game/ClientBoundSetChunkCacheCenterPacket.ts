import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetChunkCacheCenterPacket implements ClientBoundPacket {
    public constructor(public x: number, public z: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.x);
        packet.writeVarInt(this.z);
        return packet;
    }
}
