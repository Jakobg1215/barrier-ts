import { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLevelChunkWithLightPacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public z: number,
        public heightmaps: Buffer,
        public buffer: Buffer,
        public blockEntitiesData: BlockEntityInfo[],
        public skyYMask: bigint[],
        public blockYMask: bigint[],
        public emptySkyYMask: bigint[],
        public emptyBlockYMask: bigint[],
        public skyUpdates: number[][],
        public blockUpdates: number[][],
        public trustEdges: boolean,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeInt(this.x)
            .writeInt(this.z)
            .writeNbt(this.heightmaps)
            .writeVarInt(this.buffer.length)
            .append(this.buffer)
            .writeVarInt(this.blockEntitiesData.length);
        this.blockEntitiesData.forEach(entity =>
            data.writeByte(entity.packedXZ).writeShort(entity.y).writeVarInt(entity.type).writeNbt(entity.tag),
        );
        data.writeBoolean(this.trustEdges).writeVarInt(this.skyYMask.length);
        this.skyYMask.forEach(skyY => data.writeLong(skyY));
        data.writeVarInt(this.blockYMask.length);
        this.blockYMask.forEach(blockY => data.writeLong(blockY));
        data.writeVarInt(this.emptySkyYMask.length);
        this.emptySkyYMask.forEach(emptyY => data.writeLong(emptyY));
        data.writeVarInt(this.emptyBlockYMask.length);
        this.emptyBlockYMask.forEach(emptyBlockY => data.writeLong(emptyBlockY));
        data.writeVarInt(this.skyUpdates.length);
        this.skyUpdates.forEach(sky => data.writeByteArray(Buffer.from(sky)));
        data.writeVarInt(this.blockUpdates.length);
        this.blockUpdates.forEach(block => data.writeByteArray(Buffer.from(block)));
        return data;
    }
}

export interface BlockEntityInfo {
    packedXZ: number;
    y: number;
    type: number;
    tag: Buffer;
}
