import TimeUpdatePacket from '../networking/packets/Play/clientbound/TimeUpdatePacket';
import { PlayClientbound } from '../networking/types/PacketIds';
import type Server from '../server';

export default class World {
    private server: Server;
    private entityIDs: number = 0;
    private worldage = 0;
    private time = 6000;
    private ticks = 0;

    public constructor(server: Server) {
        this.server = server;
    }

    public getId() {
        return (this.entityIDs += 1);
    }

    public async tick() {
        this.ticks += 1;
        this.worldage += 1;
        this.time += 1;
        if (this.time >= 24000) {
            this.time = 0;
        }
        if (this.ticks === 20) {
            this.ticks = 0;
            const timeupdate = new TimeUpdatePacket();
            timeupdate.WorldAge = BigInt(this.worldage);
            timeupdate.Timeofday = BigInt(this.time);
            await this.server.getPlayerManager().sendPacketAll(timeupdate, PlayClientbound.TimeUpdate);
        }
    }

    public getworldage() {
        return this.worldage;
    }

    public gettime() {
        return this.time;
    }
}
