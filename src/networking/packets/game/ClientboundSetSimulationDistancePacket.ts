import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetSimulationDistancePacket implements ClientboundPacket {
    public constructor(public radius: number) {}

    public write(): Packet {
        return new Packet().writeVarInt(this.radius);
    }
}
