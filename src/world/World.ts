import type BarrierTs from '../BarrierTs';
import ClientBoundSetTimePacket from '../network/protocol/game/ClientBoundSetTimePacket';
import Chunk from './level/Chunk';

export default class World {
    public readonly levelChunks = new Map<bigint, Chunk>();
    private time = 6000n;
    private age = 0n;

    public constructor(private readonly server: BarrierTs) {}

    public tick(): void {
        this.time++;
        this.age++;

        if (this.age % 20n === 0n) {
            this.server.playerManager.sendAll(new ClientBoundSetTimePacket(this.age, this.time));
        }

        if (this.time === 24000n) this.time = 0n;
    }

    public setBlock(x: number, y: number, z: number, block: number): void {
        const chunkX = x >> 4;
        const chunkZ = z >> 4;
        const chunk = this.levelChunks.get((BigInt(chunkX) << 32n) | (BigInt(chunkZ) & 0xffffffffn));
        if (!chunk) return this.server.console.error(`Can't get chunk ${chunkX}, ${chunkZ}!`);
        chunk.setBlock(x, y, z, block);
    }

    public removeBlock(x: number, y: number, z: number): void {
        const chunkX = x >> 4;
        const chunkZ = z >> 4;
        const chunk = this.levelChunks.get((BigInt(chunkX) << 32n) | (BigInt(chunkZ) & 0xffffffffn));
        if (!chunk) return this.server.console.error(`Can't get chunk ${chunkX}, ${chunkZ}!`);
        chunk.removeBlock(x, y, z);
    }

    public getChunk(pos: bigint): Chunk {
        const chunk = this.levelChunks.get(pos);

        if (!chunk) {
            const newChunk = new Chunk(-64, 384);
            for (let bedrockX = 0; bedrockX < 16; bedrockX++) {
                for (let bedrockZ = 0; bedrockZ < 16; bedrockZ++) {
                    newChunk.setBlock(bedrockX, -64, bedrockZ, 33);
                }
            }
            for (let dirtY = 1; dirtY < 3; dirtY++) {
                for (let dirtX = 0; dirtX < 16; dirtX++) {
                    for (let dirtZ = 0; dirtZ < 16; dirtZ++) {
                        newChunk.setBlock(dirtX, -64 + dirtY, dirtZ, 10);
                    }
                }
            }
            for (let grassX = 0; grassX < 16; grassX++) {
                for (let grassZ = 0; grassZ < 16; grassZ++) {
                    newChunk.setBlock(grassX, -61, grassZ, 9);
                }
            }

            this.levelChunks.set(pos, newChunk);
            return newChunk;
        }

        return chunk;
    }
}
