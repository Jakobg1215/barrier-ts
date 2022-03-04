import { Buffer } from 'node:buffer';
import ChunkSection from './ChunkSection';

export default class Chunk {
    private readonly chunkSection: ChunkSection[] = [];
    private readonly sections: number;
    private readonly maxY: number;

    public constructor(private readonly minY: number, hight: number) {
        this.maxY = hight + minY;
        this.sections = hight >> 4;
        for (let index = 0; index < this.sections; index++) this.chunkSection.push(ChunkSection.EMPTY);
    }

    public setBlock(x: number, y: number, z: number, state: number): void {
        if (y > this.maxY || y < this.minY) throw new RangeError(`Y must be between ${this.minY} and ${this.maxY}!`);

        const chunkSection = this.chunkSection.at((y - this.minY) >> 4);
        if (!chunkSection) throw new Error(`Can not get section ${(y - this.minY) >> 4}!`);

        chunkSection.setBlock(x & 15, y & 15, z & 15, state);
    }

    public removeBlock(x: number, y: number, z: number): void {
        if (y > this.maxY || y < this.minY) throw new RangeError(`Y must be between ${this.minY} and ${this.maxY}!`);

        const chunkSection = this.chunkSection.at((y - this.minY) >> 4);
        if (!chunkSection) throw new Error(`Can not get section ${(y - this.minY) >> 4}!`);

        chunkSection.removeBlock(x & 15, y & 15, z & 15);
    }

    public toBuffer() {
        return this.chunkSection.reduce((pre, cur) => Buffer.concat([pre, cur.toBuffer().buffer]), Buffer.alloc(0));
    }
}
