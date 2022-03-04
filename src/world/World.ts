import type BarrierTs from '../BarrierTs';
import LevelChunkManager from './level/LevelChunkManager';

export default class World {
    private ticks = 0n;
    private levels: LevelChunkManager[] = [];
    public readonly defaultLevel = new LevelChunkManager(this, this.server);

    public constructor(private readonly server: BarrierTs) {
        this.levels.push(this.defaultLevel);
    }

    public tick(): void {
        this.ticks++;
    }

    public get age(): bigint {
        return this.ticks;
    }
}
