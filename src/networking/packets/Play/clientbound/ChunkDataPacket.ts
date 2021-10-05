import type { Buffer } from 'node:buffer';
import type NBT from '../../../../types/NBT';
import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ChunkDataPacket extends Packet {
    public static readonly id = PlayClientbound.ChunkData;

    public ChunkX!: number;
    public ChunkZ!: number;
    public BitMaskLength!: number;
    public PrimaryBitMask!: bigint[];
    public Heightmaps!: NBT;
    public Biomeslength!: number;
    public Biomes!: number[];
    public Size!: number;
    public Data!: Buffer;
    public Numberofblockentities!: number;
    public Blockentities!: NBT[];

    public encrypt() {
        this.writeInt(this.ChunkX);
        this.writeInt(this.ChunkZ);
        this.writeVarInt(this.BitMaskLength);
        for (let index = 0; index < this.BitMaskLength; index++) {
            this.writeLong(this.PrimaryBitMask[index]);
        }
        this.writeNBTTag(this.Heightmaps);
        this.writeVarInt(this.Biomeslength);
        for (let index = 0; index < this.Biomeslength; index++) {
            this.writeVarInt(this.Biomes[index]);
        }
        this.writeVarInt(this.Size);
        this.writeByteArray(this.Data);
        this.writeVarInt(this.Numberofblockentities);
        for (let index = 0; index < this.Numberofblockentities; index++) {
            this.writeNBTTag(this.Blockentities[index]);
        }
    }
}
