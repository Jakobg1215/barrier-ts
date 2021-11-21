import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSectionBlocksUpdatePacket implements ClientboundPacket {
    public constructor(
        public sectionPos: bigint,
        public positions: number[],
        public states: number[],
        public suppressLightUpdates: boolean,
    ) {}

    write(): Packet {
        const data: Packet = new Packet()
            .writeLong(this.sectionPos)
            .writeBoolean(this.suppressLightUpdates)
            .writeVarInt(this.positions.length);
        this.positions.forEach((pos, index) => {
            data.writeVarLong(BigInt(this.states[index] ?? 0 | pos));
        });
        return data;
    }
}
