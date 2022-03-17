import type BlockPos from '../../../types/classes/BlockPos';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundExplodePacket implements ClientBoundPacket {
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

    public write(packet: DataBuffer): DataBuffer {
        packet.writeFloat(this.x);
        packet.writeFloat(this.y);
        packet.writeFloat(this.z);
        packet.writeFloat(this.power);
        packet.writeVarInt(this.toBlow.length);
        this.toBlow.forEach((block) => {
            packet.writeByte(block.x);
            packet.writeByte(block.y);
            packet.writeByte(block.z);
        });
        packet.writeFloat(this.knockbackX);
        packet.writeFloat(this.knockbackY);
        packet.writeFloat(this.knockbackZ);
        return packet;
    }
}
