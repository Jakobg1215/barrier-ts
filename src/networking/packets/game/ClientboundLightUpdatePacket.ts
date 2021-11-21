import { Buffer } from 'node:buffer';
import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundLightUpdatePacket implements ClientboundPacket {
    public constructor(
        public x: number,
        public z: number,
        public skyYMask: bigint[],
        public blockYMask: bigint[],
        public emptySkyYMask: bigint[],
        public emptyBlockYMask: bigint[],
        public skyUpdates: number[],
        public blockUpdates: number[],
        public trustEdges: boolean,
    ) {}

    public write(): Packet {
        const data: Packet = new Packet()
            .writeVarInt(this.x)
            .writeVarInt(this.z)
            .writeBoolean(this.trustEdges)
            .writeVarInt(this.skyYMask.length);
        this.skyYMask.forEach(skyY => data.writeLong(skyY));
        data.writeVarInt(this.blockYMask.length);
        this.blockYMask.forEach(blockY => data.writeLong(blockY));
        data.writeVarInt(this.emptySkyYMask.length);
        this.emptySkyYMask.forEach(emptyY => data.writeLong(emptyY));
        data.writeVarInt(this.emptyBlockYMask.length);
        this.emptyBlockYMask.forEach(emptyBlockY => data.writeLong(emptyBlockY));
        return data.writeByteArray(Buffer.from(this.skyUpdates)).writeByteArray(Buffer.from(this.blockUpdates));
    }
}
