import Packet from "../packets/Packet";
import KeepAlivePacket from "../packets/Play/clientbound/KeepAlivePacket";
import type PlayerConnection from "./PlayerConnection";

export default class PlayerManager {
    private connections: Map<string, PlayerConnection> = new Map();

    public constructor() {
        setInterval(() => {
            this.connections.forEach(player => {
                if (player.getState() === 3) {
                    const pk = new KeepAlivePacket();
                    pk.KeepAliveID = BigInt(Math.floor(Math.random() * (10000 - -10000)) + -10000);
                    player.sendPacket(pk, 0x1F);
                }
            });
        }, 1000);
    }

    public addConnection(ip: string, player: PlayerConnection) {
        this.connections.set(ip, player);
    }

    public removeConnection(ip: string) {
        this.connections.delete(ip);
    }

    public getConnections() {
        return this.connections;
    }

    public async sendPacketAll(packet: Packet, id: number) {
        this.connections.forEach(async player => await player.sendPacket(packet, id));
    }
}