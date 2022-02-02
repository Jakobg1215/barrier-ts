import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundPlayerPositionPacket implements ClientBoundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
        public relativeArguments: number,
        public id: number,
        public dismountVehicle: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeFloat(this.yRot);
        packet.writeFloat(this.xRot);
        packet.writeByte(this.relativeArguments);
        packet.writeVarInt(this.id);
        packet.writeBoolean(this.dismountVehicle);
        return packet;
    }
}
