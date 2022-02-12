import { Buffer } from 'node:buffer';
import { endianness } from 'node:os';
import DataBuffer from '../../network/DataBuffer';

export default class Chunk {
    public static get EMPTY(): Chunk {
        return new this();
    }

    private readonly data = new Uint16Array(4096);
    private blockCount = 0;

    public getBlock(x: number, y: number, z: number): number {
        const index = this.data[this.getBlockIndex(x, y, z)];
        return index ? index : 0;
    }

    public removeBlock(x: number, y: number, z: number): void {
        this.data[this.getBlockIndex(x, y, z)] = 0;
        this.blockCount--;
    }

    public setBlock(x: number, y: number, z: number, state: number): void {
        if (this.data[this.getBlockIndex(x, y, z)] !== 0) return;
        this.data[this.getBlockIndex(x, y, z)] = state;
        this.blockCount++;
    }

    public toBuffer(): DataBuffer {
        const data = new DataBuffer();
        data.writeShort(this.blockCount);

        if (this.blockCount === 0) {
            data.writeUnsignedByte(0);
            data.writeVarInt(0);
            data.writeVarInt(0);
        } else {
            const uniqueBlockId = [...new Set(this.data)];
            const bitsPerValue = uniqueBlockId.length.toString(2).length;

            if (bitsPerValue <= 4) {
                data.writeUnsignedByte(4);
                data.writeVarInt(uniqueBlockId.length);
                uniqueBlockId.forEach(blockId => data.writeVarInt(blockId));
                const dataToBits = this.data.reduce(
                    (pre, cur) => pre + uniqueBlockId.indexOf(cur).toString(2).padStart(4, '0'),
                    '',
                );
                const longDataBits = dataToBits.match(/.{1,64}/g) as string[];
                const longData = new BigUint64Array(longDataBits.map(val => BigInt(`0b${val}`)));
                const longBuffer = Buffer.from(longData.buffer);

                if (endianness() === 'LE') longBuffer.swap64();

                data.writeVarInt(longData.length);
                data.append(longBuffer);
            }

            if (bitsPerValue > 4 && bitsPerValue <= 8) {
                data.writeUnsignedByte(bitsPerValue);
                data.writeVarInt(uniqueBlockId.length);
                uniqueBlockId.forEach(blockId => data.writeVarInt(blockId));
                const dataToBits = this.data.reduce(
                    (pre, cur) => pre + uniqueBlockId.indexOf(cur).toString(2).padStart(4, '0'),
                    '',
                );
                const longDataBits = dataToBits.match(/.{1,64}/g) as string[];
                const longData = new BigUint64Array(longDataBits.map(val => BigInt(`0b${val}`)));
                const longBuffer = Buffer.from(longData.buffer);

                if (endianness() === 'LE') longBuffer.swap64();

                data.writeVarInt(longData.length);
                data.append(longBuffer);
            }

            if (bitsPerValue > 8) {
                data.writeUnsignedByte(bitsPerValue);
                const dataToBits = this.data.reduce(
                    (pre, cur) => pre + uniqueBlockId.indexOf(cur).toString(2).padStart(4, '0'),
                    '',
                );
                const longDataBits = dataToBits.match(/.{1,64}/g) as string[];
                const longData = new BigUint64Array(longDataBits.map(val => BigInt(`0b${val}`)));
                const longBuffer = Buffer.from(longData.buffer);

                if (endianness() === 'LE') longBuffer.swap64();

                data.writeVarInt(longData.length);
                data.append(longBuffer);
            }
        }

        data.writeUnsignedByte(0);
        data.writeVarInt(0);
        data.writeVarInt(0);

        return data;
    }

    private getBlockIndex(x: number, y: number, z: number): number {
        return (y << 8) | (z << 4) | (x ^ 15);
    }
}
