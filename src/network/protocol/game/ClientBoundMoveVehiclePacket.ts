import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMoveVehiclePacket implements ClientBoundPacket {
    public constructor(public x: number, public y: number, public z: number, public yRot: number, public xRot: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeFloat(this.yRot);
        packet.writeFloat(this.xRot);
        return packet;
    }
}
