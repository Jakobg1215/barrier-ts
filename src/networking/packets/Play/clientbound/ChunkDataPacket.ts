import { PlayClientbound } from '../../../types/PacketIds';
import Packet from '../../Packet';

export default class ChunkDataPacket extends Packet {
    public static readonly id = PlayClientbound.ChunkData;

    public ChunkX!: number;
    public ChunkZ!: number;
    public Fullchunk!: boolean;
    public PrimaryBitMask!: number;
    public Heightmaps!: Buffer;
    public Biomeslength!: number;
    public Biomes!: number[];
    public Size!: number;
    public Data!: number[];
    public Numberofblockentities!: number;
    public Blockentities!: Buffer[];

    public encrypt() {
        this.writeInt(this.ChunkX);
        this.writeInt(this.ChunkZ);
        this.writeBoolean(this.Fullchunk);
        this.writeVarInt(this.PrimaryBitMask);
        this.append(this.Heightmaps);
        if (this.Fullchunk) {
            this.writeVarInt(this.Biomeslength);
            this.append(Buffer.from(this.Biomes));
        }
        this.writeVarInt(this.Size);
        this.append(Buffer.from(this.Data));
        this.writeVarInt(this.Numberofblockentities);
        for (let index = 0; index < this.Numberofblockentities; index++) {
            this.append(this.Blockentities[index]);
        }
    }
}
