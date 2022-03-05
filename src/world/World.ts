import type BarrierTs from '../BarrierTs';
import { ServerComponent } from '../types/classes/ServerComponent';
import LevelChunkManager from './level/LevelChunkManager';
export default class World extends ServerComponent {
    private ticks = 0n;
    private levels: LevelChunkManager[] = [];
    public readonly defaultLevel = new LevelChunkManager(this, this.server);

    public constructor(private readonly server: BarrierTs) {
        super();
        this.levels.push(this.defaultLevel);
    }

    public override tick(): void {
        this.ticks++;
    }

    public get age(): bigint {
        return this.ticks;
    }
}
