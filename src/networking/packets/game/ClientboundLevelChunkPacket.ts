import type { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLevelChunkPacket implements ClientboundPacket {
    public readonly id: number = 34;
    public x: number;
    public z: number;
    public availableSections: bigint[];
    public heightmaps: Buffer;
    public biomes: number[];
    public buffer: Buffer;
    public blockEntitiesTags: Buffer[];

    public constructor(
        x: number,
        z: number,
        availableSections: bigint[],
        heightmaps: Buffer,
        biomes: number[],
        buffer: Buffer,
        blockEntitiesTags: Buffer[],
    ) {
        this.x = x;
        this.z = z;
        this.availableSections = availableSections;
        this.heightmaps = heightmaps;
        this.biomes = biomes;
        this.buffer = buffer;
        this.blockEntitiesTags = blockEntitiesTags;
    }

    public write(): Packet {
        const data = new Packet().writeInt(this.x).writeInt(this.z).writeVarInt(this.availableSections.length);
        this.availableSections.forEach(section => data.writeLong(section));
        data.append(this.heightmaps).writeVarInt(this.biomes.length);
        this.biomes.forEach(biome => data.writeVarInt(biome));
        data.writeVarInt(this.buffer.length).append(this.buffer).writeVarInt(this.blockEntitiesTags.length);
        this.blockEntitiesTags.forEach(entity => data.append(entity));
        return data;
    }
}
