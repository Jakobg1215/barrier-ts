import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundTeleportEntityPacket implements ClientBoundPacket {
    public constructor(public id: number, public x: number, public y: number, public z: number, public yRot: number, public xRot: number, public onGround: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeByte(this.yRot);
        packet.writeByte(this.xRot);
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
