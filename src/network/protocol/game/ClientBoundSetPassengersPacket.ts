import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetPassengersPacket implements ClientBoundPacket {
    public constructor(public vehicle: number, public passengers: number[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.vehicle);
        packet.writeVarInt(this.passengers.length);
        this.passengers.forEach((passenger) => packet.writeVarInt(passenger));
        return packet;
    }
}
