import { Buffer } from 'node:buffer';
import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundLightUpdatePacket implements ClientBoundPacket {
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

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.x);
        packet.writeVarInt(this.z);
        packet.writeBoolean(this.trustEdges);
        packet.writeVarInt(this.skyYMask.length);
        this.skyYMask.forEach(skyY => packet.writeLong(skyY));
        packet.writeVarInt(this.blockYMask.length);
        this.blockYMask.forEach(blockY => packet.writeLong(blockY));
        packet.writeVarInt(this.emptySkyYMask.length);
        this.emptySkyYMask.forEach(emptyY => packet.writeLong(emptyY));
        packet.writeVarInt(this.emptyBlockYMask.length);
        this.emptyBlockYMask.forEach(emptyBlockY => packet.writeLong(emptyBlockY));
        packet.writeByteArray(Buffer.from(this.skyUpdates));
        packet.writeByteArray(Buffer.from(this.blockUpdates));
        return packet;
    }
}
