import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetSimulationDistancePacket implements ClientBoundPacket {
    public constructor(public radius: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.radius);
        return packet;
    }
}
