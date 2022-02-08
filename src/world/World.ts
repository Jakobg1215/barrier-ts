import type BarrierTs from '../BarrierTs';
import type Connection from '../network/Connection';
import ClientBoundLevelChunkWithLightPacket from '../network/protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundSetTimePacket from '../network/protocol/game/ClientBoundSetTimePacket';
import objectToNbt from '../utilitys/objectToNbt';
import ChunkColumn from './level/ChunkColumn';

export default class World {
    private ticks = 0n;
    private time = 6000n;
    public readonly levelChunks = new Map<bigint, ChunkColumn>();

    public constructor(private readonly server: BarrierTs) {
        for (let x = -8n; x <= 8n; x++) {
            for (let z = -8n; z <= 8n; z++) {
                const chunk = new ChunkColumn(-64, 384);
                for (let bedrockX = 0; bedrockX < 16; bedrockX++) {
                    for (let bedrockZ = 0; bedrockZ < 16; bedrockZ++) {
                        chunk.setBlock(bedrockX, -64, bedrockZ, 33);
                    }
                }
                for (let dirtY = 1; dirtY < 3; dirtY++) {
                    for (let dirtX = 0; dirtX < 16; dirtX++) {
                        for (let dirtZ = 0; dirtZ < 16; dirtZ++) {
                            chunk.setBlock(dirtX, -64 + dirtY, dirtZ, 10);
                        }
                    }
                }
                for (let grassX = 0; grassX < 16; grassX++) {
                    for (let grassZ = 0; grassZ < 16; grassZ++) {
                        chunk.setBlock(grassX, -61, grassZ, 9);
                    }
                }

                this.levelChunks.set((x << 32n) | (z & 0xffffffffn), chunk);
            }
        }
    }

    public tick(): void {
        this.ticks++;
        this.time++;

        if (this.ticks % 20n === 0n) {
            this.server.playerManager.sendAll(new ClientBoundSetTimePacket(this.ticks, this.time));
        }

        if (this.time === 24000n) this.time = 0n;
    }

    public setBlock(x: number, y: number, z: number, block: number): void {
        const chunkX = Math.floor(x / 16);
        const chunkZ = Math.floor(z / 16);
        const chunk = this.levelChunks.get((BigInt(chunkX) << 32n) | (BigInt(chunkZ) & 0xffffffffn));
        if (!chunk) return this.server.console.error(`Can't get chunk ${chunkX}, ${chunkZ}!`);
        chunk.setBlock(x, y, z, block);
    }

    public removeBlock(x: number, y: number, z: number): void {
        const chunkX = Math.floor(x / 16);
        const chunkZ = Math.floor(z / 16);
        const chunk = this.levelChunks.get((BigInt(chunkX) << 32n) | (BigInt(chunkZ) & 0xffffffffn));
        if (!chunk) return this.server.console.error(`Can't get chunk ${chunkX}, ${chunkZ}!`);
        chunk.removeBlock(x, y, z);
    }

    public sendWorldData(conn: Connection): void {
        conn.send(new ClientBoundSetTimePacket(this.ticks, this.time));

        for (const [location, chunk] of this.levelChunks.entries()) {
            const x = Number(location >> 32n);
            const z = (Number(location & 0xffffffffn) << 24) >> 24;
            conn.send(
                new ClientBoundLevelChunkWithLightPacket(
                    x,
                    z,
                    objectToNbt({}),
                    chunk.toBuffer(),
                    [],
                    [3n],
                    [0n],
                    [2n],
                    [7n],
                    [
                        Array.from({ length: 2048 }).fill(0) as number[],
                        Array.from({ length: 2048 }).fill(255) as number[],
                    ],
                    [],
                    true,
                ),
            );
        }
    }
}
