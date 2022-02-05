import { Buffer } from 'node:buffer';
import Chunk from './Chunk';

export default class ChunkColumn {
    private readonly chunks: Chunk[] = [];
    private readonly sections: number;

    public constructor(private readonly minY: number, private readonly maxY: number) {
        this.sections = (Math.abs(minY) + maxY) >> 4;
        for (let index = 0; index < this.sections; index++) this.chunks.push(Chunk.EMPTY);
    }

    public setBlock(x: number, y: number, z: number, state: number): void {
        if (y > this.maxY || y < this.minY)
            throw new RangeError(
                `Position y is out of bounds of the ChunkColumn! Number must be between ${this.minY} and ${this.maxY}`,
            );

        const chunk = this.chunks.at((y - this.minY) >> 4);
        if (!chunk) throw new Error(`Can not get section ${(y - this.minY) >> 4}!`);

        chunk.setBlock(Math.abs((x & 15) - 15), y & 15, z & 15, state);
    }

    public toBuffer() {
        return this.chunks.reduce((pre, cur) => Buffer.concat([pre, cur.toBuffer().buffer]), Buffer.alloc(0));
    }
}
