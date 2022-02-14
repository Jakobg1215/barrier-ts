import { Buffer } from 'node:buffer';
import Chunk from './Chunk';

export default class ChunkColumn {
    private readonly chunks: Chunk[] = [];
    private readonly sections: number;
    private readonly maxY: number;

    public constructor(private readonly minY: number, hight: number) {
        this.maxY = hight + minY;
        this.sections = hight >> 4;
        for (let index = 0; index < this.sections; index++) this.chunks.push(Chunk.EMPTY);
    }

    public setBlock(x: number, y: number, z: number, state: number): void {
        if (y > this.maxY || y < this.minY) throw new RangeError(`Y must be between ${this.minY} and ${this.maxY}!`);

        const chunk = this.chunks.at((y - this.minY) >> 4);
        if (!chunk) throw new Error(`Can not get section ${(y - this.minY) >> 4}!`);

        chunk.setBlock(x & 15, y & 15, z & 15, state);
    }

    public removeBlock(x: number, y: number, z: number): void {
        if (y > this.maxY || y < this.minY) throw new RangeError(`Y must be between ${this.minY} and ${this.maxY}!`);

        const chunk = this.chunks.at((y - this.minY) >> 4);
        if (!chunk) throw new Error(`Can not get section ${(y - this.minY) >> 4}!`);

        chunk.removeBlock(x & 15, y & 15, z & 15);
    }

    public toBuffer() {
        return this.chunks.reduce((pre, cur) => Buffer.concat([pre, cur.toBuffer().buffer]), Buffer.alloc(0));
    }
}
