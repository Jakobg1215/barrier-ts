import type BarrierTs from '../BarrierTs';
import type Connection from '../network/Connection';
import ClientBoundSetTimePacket from '../network/protocol/game/ClientBoundSetTimePacket';

export default class World {
    private ticks = 0n;
    private time = 6000n;

    public constructor(private readonly server: BarrierTs) {}

    public tick(): void {
        this.ticks++;
        this.time++;

        if (this.ticks % 20n === 0n) {
            this.server.playerManager.sendAll(new ClientBoundSetTimePacket(this.ticks, this.time));
        }

        if (this.time === 24000n) this.time = 0n;
    }

    public sendWorldData(conn: Connection): void {
        conn.send(new ClientBoundSetTimePacket(this.ticks, this.time));
    }
}
