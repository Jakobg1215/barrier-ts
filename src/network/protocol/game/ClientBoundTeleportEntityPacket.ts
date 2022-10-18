import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundTeleportEntityPacket implements ClientBoundPacket {
    public constructor(
        public id: number,
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
        public onGround: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeByte(Math.floor((this.yRot * 256) / 360));
        packet.writeByte(Math.floor((this.xRot * 256) / 360));
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
