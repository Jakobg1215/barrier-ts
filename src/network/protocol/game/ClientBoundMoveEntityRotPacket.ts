import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMoveEntityPacketRot implements ClientBoundPacket {
    public constructor(public entityId: number, public yRot: number, public xRot: number, public onGround: boolean) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeByte(this.yRot);
        packet.writeByte(this.xRot);
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
