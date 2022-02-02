import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAddMobPacket implements ClientBoundPacket {
    public constructor(
        public id: number,
        public uuid: UUID,
        public type: number,
        public x: number,
        public y: number,
        public z: number,
        public xd: number,
        public yd: number,
        public zd: number,
        public yRot: number,
        public xRot: number,
        public yHeadRot: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeUUID(this.uuid);
        packet.writeVarInt(this.type);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeByte(this.yRot);
        packet.writeByte(this.xRot);
        packet.writeByte(this.yHeadRot);
        packet.writeShort(this.xd);
        packet.writeShort(this.yd);
        packet.writeShort(this.zd);
        return packet;
    }
}
