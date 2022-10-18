import type UUID from '../../../types/classes/UUID';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundAddPlayerPacket implements ClientBoundPacket {
    public constructor(public entityId: number, public playerId: UUID, public x: number, public y: number, public z: number, public yRot: number, public xRot: number) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.entityId);
        packet.writeUUID(this.playerId);
        packet.writeDouble(this.x);
        packet.writeDouble(this.y);
        packet.writeDouble(this.z);
        packet.writeByte(Math.floor((this.yRot * 256) / 360));
        packet.writeByte(Math.floor((this.xRot * 256) / 360));
        return packet;
    }
}
