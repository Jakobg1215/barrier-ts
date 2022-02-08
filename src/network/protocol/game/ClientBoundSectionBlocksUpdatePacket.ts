import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSectionBlocksUpdatePacket implements ClientBoundPacket {
    public constructor(
        public sectionPos: bigint,
        public positions: number[],
        public states: number[],
        public suppressLightUpdates: boolean,
    ) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeLong(this.sectionPos);
        packet.writeBoolean(this.suppressLightUpdates);
        packet.writeVarInt(this.positions.length);
        this.positions.forEach((pos, index) => {
            packet.writeVarLong(BigInt((this.states[index] ?? 0 << 12) | pos));
        });
        return packet;
    }
}
