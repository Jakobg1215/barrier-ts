import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundInitializeBorderPacket implements ClientboundPacket {
    public constructor(
        public newCenterX: number,
        public newCenterZ: number,
        public oldSize: number,
        public newSize: number,
        public lerpTime: bigint,
        public newAbsoluteMaxSize: number,
        public warningBlocks: number,
        public warningTime: number,
    ) {}

    public write(): Packet {
        return new Packet()
            .writeDouble(this.newCenterX)
            .writeDouble(this.newCenterZ)
            .writeDouble(this.oldSize)
            .writeDouble(this.newSize)
            .writeVarLong(this.lerpTime)
            .writeVarInt(this.newAbsoluteMaxSize)
            .writeVarInt(this.warningBlocks)
            .writeVarInt(this.warningTime);
    }
}
