import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAddEntityPacket implements ClientBoundPacket {
    public constructor(
        public id: number,
        public uuid: UUID,
        public type: number,
        public x: number,
        public y: number,
        public z: number,
        public xRot: number,
        public yRot: number,
        public yHeadRot: number,
        public data: number,
        public xa: number,
        public ya: number,
        public za: number,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        packet.writeUUID(this.uuid);
        packet.writeVarInt(this.type);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeByte(this.xRot);
        packet.writeByte(this.yRot);
        packet.writeByte(this.yHeadRot);
        packet.writeVarInt(this.data);
        packet.writeShort(this.xa);
        packet.writeShort(this.ya);
        packet.writeShort(this.za);
        return packet;
    }
}
