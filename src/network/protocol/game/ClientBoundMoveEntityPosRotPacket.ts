import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMoveEntityPacketPosRot implements ClientBoundPacket {
    public constructor(
        public entityId: number,
        public xa: number,
        public ya: number,
        public za: number,
        public yRot: number,
        public xRot: number,
        public onGround: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeShort(this.xa);
        packet.writeShort(this.ya);
        packet.writeShort(this.za);
        packet.writeByte(this.yRot);
        packet.writeByte(this.xRot);
        packet.writeBoolean(this.onGround);
        return packet;
    }
}
