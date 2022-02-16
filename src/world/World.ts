import type BarrierTs from '../BarrierTs';
import type GamePacketListener from '../network/GamePacketListener';
import ClientBoundLevelChunkWithLightPacket from '../network/protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundSetTimePacket from '../network/protocol/game/ClientBoundSetTimePacket';
import objectToNbt from '../utilitys/objectToNbt';
import ChunkColumn from './level/ChunkColumn';

export default class World {
    private ticks = 0n;
    private time = 6000n;
    public readonly levelChunks = new Map<bigint, ChunkColumn>();

    public constructor(private readonly server: BarrierTs) {}

    public tick(): void {
        this.ticks++;
        this.time++;

        if (this.ticks % 20n === 0n) {
            this.server.playerManager.sendAll(new ClientBoundSetTimePacket(this.ticks, this.time));
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

    public getChunk(x: number, z: number): ChunkColumn {
        const chunkPos = (BigInt(x) << 32n) | (BigInt(z) & 0xffffffffn);
        const chunk = this.levelChunks.get(chunkPos);

        if (!chunk) {
            const newChunk = new ChunkColumn(-64, 384);
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

            this.levelChunks.set(chunkPos, newChunk);
            return newChunk;
        }

        return chunk;
    }

    public sendWorldData(player: GamePacketListener): void {
        player.send(new ClientBoundSetTimePacket(this.ticks, this.time));
        const chunkX = player.player.pos.x >> 4;
        const chunkZ = player.player.pos.z >> 4;

        for (let x = -9 + chunkX; x <= 9 + chunkX; x++) {
            for (let z = -9 + chunkZ; z <= 9 + chunkZ; z++) {
                const chunk = this.getChunk(x, z);
                player.send(
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
}
