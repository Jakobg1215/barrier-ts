import type BarrierTs from '../BarrierTs';
import LevelChunkManager from './level/LevelChunkManager';
import { ServerComponent } from '../types/classes/ServerComponent';
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
