import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPosPacket implements ClientboundPacket {
    public readonly id: number = 41;
    public entityId: number;
    public xa: number;
    public ya: number;
    public za: number;
    public onGround: boolean;

    public constructor(entityId: number, xa: number, ya: number, za: number, onGround: boolean) {
        this.entityId = entityId;
        this.xa = xa;
        this.ya = ya;
        this.za = za;
        this.onGround = onGround;
    }

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeShort(this.xa)
            .writeShort(this.ya)
            .writeShort(this.za)
            .writeBoolean(this.onGround);
    }
}
