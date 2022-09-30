import type Connection from '../../network/Connection';
import ClientBoundForgetLevelChunkPacket from '../../network/protocol/game/ClientBoundForgetLevelChunkPacket';
import ClientBoundLevelChunkWithLightPacket from '../../network/protocol/game/ClientBoundLevelChunkWithLightPacket';
import ClientBoundSetChunkCacheCenterPacket from '../../network/protocol/game/ClientBoundSetChunkCacheCenterPacket';
import objectToNbt from '../../utilities/objectToNbt';
import type Chunk from './Chunk';
import type LevelChunkManager from './LevelChunkManager';

export default class ChunkLoader {
    private readonly chunks = new Map<bigint, Chunk>();
    private radius: number;

    public constructor(
        private readonly connection: Connection,
        private levelChunkManager: LevelChunkManager,
        private xPos: number,
        private zPos: number,
        radius: number,
    ) {
        this.radius = ++radius;
        this.clampRadius();
    }

    public setChunkPosition(xPos: number, zPos: number): void {
        this.xPos = xPos;
        this.zPos = zPos;
        this.updateChangedChunks();
    }

    public setRadius(radius: number) {
        this.radius = ++radius;
        this.clampRadius();
        this.updateChangedChunks();
    }

    public changeLevel(chunkManager: LevelChunkManager): void {
        this.chunks.clear();
        this.levelChunkManager = chunkManager;
        this.updateChangedChunks();
    }

    private clampRadius(): void {
        this.radius = Math.max(Math.min(this.radius, 33), 3);
    }

    public updateChangedChunks(): void {
        const loadedChunksPositions = new BigInt64Array(this.chunks.keys());

        const newChunks: bigint[] = [];
        for (let newChunkX = -this.radius; newChunkX <= this.radius; newChunkX++) {
            for (let newChunkZ = -this.radius; newChunkZ <= this.radius; newChunkZ++) {
                newChunks.push((BigInt(newChunkX + this.xPos) << 32n) | (BigInt(newChunkZ + this.zPos) & 0xffffffffn));
            }
        }

        const addedChunks = newChunks.filter((chunkPos) => !loadedChunksPositions.includes(chunkPos));
        const removedChunks = loadedChunksPositions.filter((chunkPos) => !newChunks.includes(chunkPos));

        this.connection.send(new ClientBoundSetChunkCacheCenterPacket(this.xPos, this.zPos));

        addedChunks.forEach((chunkPos) => {
            const newChunk = this.levelChunkManager.getChunk(chunkPos);

            const x = Number(chunkPos >> 32n);
            const z = Number(chunkPos & 0xffffffffn) ^ 0;

            this.connection.send(
                new ClientBoundLevelChunkWithLightPacket(
                    x,
                    z,
                    objectToNbt({}),
                    newChunk.toBuffer(),
                    [],
                    [3n],
                    [0n],
                    [2n],
                    [7n],
                    [Array.from({ length: 2048 }).fill(0) as number[], Array.from({ length: 2048 }).fill(255) as number[]],
                    [],
                    true,
                ),
            );

            this.chunks.set(chunkPos, newChunk);
        });

        removedChunks.forEach((chunkPos) => {
            const chunk = this.chunks.get(chunkPos);

            const x = Number(chunkPos >> 32n);
            const z = Number(chunkPos & 0xffffffffn) ^ 0;

            this.connection.send(new ClientBoundForgetLevelChunkPacket(x, z));

            if (!chunk) return;
            this.chunks.delete(chunkPos);
        });
    }

    public get loadedChunks() {
        return this.chunks;
    }

    public get viewDistance() {
        return this.radius;
    }
}
