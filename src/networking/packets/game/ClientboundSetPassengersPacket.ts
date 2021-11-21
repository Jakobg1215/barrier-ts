import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetPassengersPacket implements ClientboundPacket {
    public constructor(public vehicle: number, public passengers: number[]) {}

    public write(): Packet {
        const data: Packet = new Packet().writeVarInt(this.vehicle).writeVarInt(this.passengers.length);
        this.passengers.forEach(passenger => data.writeVarInt(passenger));
        return data;
    }
}
