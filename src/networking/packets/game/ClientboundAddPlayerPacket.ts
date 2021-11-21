import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddPlayerPacket implements ClientboundPacket {
    public constructor(
        public entityId: number,
        public playerId: string,
        public x: number,
        public y: number,
        public z: number,
        public yRot: number,
        public xRot: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeUUID(this.playerId)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeByte(this.yRot)
            .writeByte(this.xRot);
    }
}
