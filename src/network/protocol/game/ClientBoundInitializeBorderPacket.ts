import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundInitializeBorderPacket implements ClientBoundPacket {
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

    public write(packet: DataBuffer): DataBuffer {
        packet.writeDouble(this.newCenterX);
        packet.writeDouble(this.newCenterZ);
        packet.writeDouble(this.oldSize);
        packet.writeDouble(this.newSize);
        packet.writeVarLong(this.lerpTime);
        packet.writeVarInt(this.newAbsoluteMaxSize);
        packet.writeVarInt(this.warningBlocks);
        packet.writeVarInt(this.warningTime);
        return packet;
    }
}
