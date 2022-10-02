import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetSimulationDistancePacket implements ClientBoundPacket {
    public constructor(public simulationDistance: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.simulationDistance);
        return packet;
    }
}
