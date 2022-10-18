import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMoveEntityPacketRot implements ClientBoundPacket {
    public constructor(public entityId: number, public yRot: number, public xRot: number, public onGround: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeByte(Math.floor((this.yRot * 256) / 360));
        packet.writeByte(Math.floor((this.xRot * 256) / 360));
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
