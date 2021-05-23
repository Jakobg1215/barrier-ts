import net from "net";
import Connection from "./networking/Connection";
import NetworkRegistry from "./networking/NetworkRegistry";
import Packet from "./networking/packets/Packet";
import KeepAlivePacket from "./networking/packets/Play/clientbound/KeepAlivePacket";

export default class Server {
    private server: net.Server;
    private NetworkRegistry: NetworkRegistry;
    private connections: Map<string, Connection> = new Map();

    public constructor() {
        this.server = new net.Server();
        this.server.close();
        this.NetworkRegistry = new NetworkRegistry();
    }

    public getNetworkRegistry() {
        return this.NetworkRegistry;
    }

    public async listen(port = 25565) {
        await this.NetworkRegistry.registerNetwork();
        setInterval(() => {
            this.connections.forEach(conn => {
                if (conn.state === 3) {
                    const pk = new KeepAlivePacket();
                    conn.keepAliveId = BigInt(Math.floor(Math.random() * (10000 - -10000)) + -10000);
                    pk.KeepAliveID = conn.keepAliveId;
                    conn.sendPacket(pk, 0x1F);
                }
            });
        }, 1000);
        this.server.listen(port, () => {
            console.log(`Server is now listening on port: ${port}`);
        });
        this.server.on("connection", conn => {
            const connect = new Connection(conn);
            if (!this.connections.has(conn.remoteAddress!)) {
                this.connections.set(conn.remoteAddress!, connect);
            }
            conn.on("data", async data => {
                await this.incomingdata(data, connect);
            });
            conn.on("close", () => {
                this.connections.delete(conn.remoteAddress!);
            });
            conn.on("error", () => {
                conn.end();
                this.connections.delete(conn.remoteAddress!);
            });
        });
    }

    private async incomingdata(data: Buffer, connect: Connection) {
        const incomePacket = new Packet(data);
        incomePacket.readVarInt(); // Packet Length
        const packetId = incomePacket.readVarInt();
        const packet = this.NetworkRegistry.getPacket(connect.state, packetId);
        if (!packet) {
            return console.log(`Packet 0x${packetId.toString(16)} for state ${connect.state} isn't implemented`);
        }
        const hander = this.NetworkRegistry.getHandler(connect.state, packetId);
        if (!hander) {
            return console.log(`Packet handler 0x${packetId.toString(16)} for state ${connect.state} isn't implemented`);
        }
        const pk = new packet(incomePacket.getBytes().slice(incomePacket.getOffset()));
        pk.decrypt();
        hander.handle(pk, this, connect);
    }
}

const server = new Server();
(async () => {
    await server.listen();
})();
