import type Player from '../../../world/entity/Player';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundAddPlayerPacket implements ClientboundPacket {
    public readonly id: number = 4;
    public entityId: number;
    public playerId: string;
    public x: number;
    public y: number;
    public z: number;
    public yRot: number;
    public xRot: number;

    public constructor(player: Player) {
        this.entityId = player.id;
        this.playerId = player.gameProfile.uuid;
        this.x = player.position.x;
        this.y = player.position.y;
        this.z = player.position.z;
        this.yRot = ((Math.round(player.rotation.y) * 256) / 360) & 255;
        this.xRot = ((Math.round(player.rotation.x) * 256) / 360) & 255;
    }

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeUUID(this.playerId)
            .writeDouble(this.x)
            .writeDouble(this.y)
            .writeDouble(this.z)
            .writeUnsignedByte(this.yRot)
            .writeUnsignedByte(this.xRot);
    }
}
