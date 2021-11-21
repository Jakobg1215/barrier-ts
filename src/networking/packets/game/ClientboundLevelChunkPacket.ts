import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLevelChunkPacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public z: number,
        public availableSections: bigint[],
        public heightmaps: Buffer,
        public biomes: number[],
        public buffer: Buffer,
        public blockEntitiesTags: Buffer[],
    ) {}

    public write(): Packet {
        const data: Packet = new Packet().writeInt(this.x).writeInt(this.z).writeVarInt(this.availableSections.length);
        this.availableSections.forEach(section => data.writeLong(section));
        data.append(this.heightmaps).writeVarInt(this.biomes.length);
        this.biomes.forEach(biome => data.writeVarInt(biome));
        data.writeVarInt(this.buffer.length).append(this.buffer).writeVarInt(this.blockEntitiesTags.length);
        this.blockEntitiesTags.forEach(entity => data.append(entity));
        return data;
    }
}
