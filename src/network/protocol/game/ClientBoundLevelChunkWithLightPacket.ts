import { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLevelChunkWithLightPacket implements ClientBoundPacket {
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

    public write(packet: DataBuffer): DataBuffer {
        packet.writeInt(this.x);
        packet.writeInt(this.z);
        packet.writeNbt(this.heightmaps);
        packet.writeVarInt(this.buffer.length).append(this.buffer);
        packet.writeVarInt(this.blockEntitiesData.length);
        this.blockEntitiesData.forEach(entity => {
            packet.writeByte(entity.packedXZ);
            packet.writeShort(entity.y);
            packet.writeVarInt(entity.type);
            packet.writeNbt(entity.tag);
        });
        packet.writeBoolean(this.trustEdges);
        packet.writeVarInt(this.skyYMask.length);
        this.skyYMask.forEach(skyY => packet.writeLong(skyY));
        packet.writeVarInt(this.blockYMask.length);
        this.blockYMask.forEach(blockY => packet.writeLong(blockY));
        packet.writeVarInt(this.emptySkyYMask.length);
        this.emptySkyYMask.forEach(emptyY => packet.writeLong(emptyY));
        packet.writeVarInt(this.emptyBlockYMask.length);
        this.emptyBlockYMask.forEach(emptyBlockY => packet.writeLong(emptyBlockY));
        packet.writeVarInt(this.skyUpdates.length);
        this.skyUpdates.forEach(sky => packet.writeByteArray(Buffer.from(sky)));
        packet.writeVarInt(this.blockUpdates.length);
        this.blockUpdates.forEach(block => packet.writeByteArray(Buffer.from(block)));
        return packet;
    }
}

export interface BlockEntityInfo {
    packedXZ: number;
    y: number;
    type: number;
    tag: Buffer;
}
