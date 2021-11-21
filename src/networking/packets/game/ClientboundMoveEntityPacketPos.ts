import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundMoveEntityPacketPos implements ClientboundPacket {
    public constructor(
        public entityId: number,
        public xa: number,
        public ya: number,
        public za: number,
        public onGround: boolean,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeVarInt(this.entityId)
            .writeShort(this.xa)
            .writeShort(this.ya)
            .writeShort(this.za)
            .writeBoolean(this.onGround);
    }
}
