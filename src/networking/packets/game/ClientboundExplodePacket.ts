import type BlockPos from '../../../types/classes/BlockPos';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundExplodePacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public y: number,
        public z: number,
        public power: number,
        public toBlow: BlockPos[],
        public knockbackX: number,
        public knockbackY: number,
        public knockbackZ: number,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeFloat(this.x)
            .writeFloat(this.y)
            .writeFloat(this.z)
            .writeFloat(this.power)
            .writeVarInt(this.toBlow.length);
        this.toBlow.forEach(block => data.writeByte(block.x).writeByte(block.y).writeByte(block.z));
        return data.writeFloat(this.knockbackX).writeFloat(this.knockbackY).writeFloat(this.knockbackZ);
    }
}
