import net from "net";
import Connection from "./networking/Connection";
import NetworkRegistry from "./networking/NetworkRegistry";
import Packet from "./networking/packets/Packet";

export default class Server {
    private server: net.Server;
    private NetworkRegistry: NetworkRegistry;
    private connections: Map<string, Connection> = new Map();

    public constructor() {
        this.server = new net.Server();
        this.server.close();
        this.NetworkRegistry = new NetworkRegistry();
    }
    public async listen(port = 25565) {
        await this.NetworkRegistry.registerNetwork();
        this.server.listen(port, () => {
            console.log(`Server is now listening on port: ${port}`);
        });
        this.server.on("connection", conn => {
            const connect = new Connection(conn);
            if (!this.connections.has(conn.remoteAddress!)) {
                this.connections.set(conn.remoteAddress!, connect);
            }
            conn.on("data", async data => {
                await this.incomeingdata(data, conn.remoteAddress!);
            });
            conn.on("close", () => {
                this.connections.delete(conn.remoteAddress!);
            });
        });
    }
    private async incomeingdata(data: Buffer, address: string) {
        const incomePacket = new Packet(data);
        incomePacket.readVarInt(); // Packet Length
        const packetId = incomePacket.readVarInt();
        const packet = this.NetworkRegistry.getPacket(this.connections.get(address)?.state ?? 0, true, packetId);
        if (!packet) {
            return console.log(`Packet 0x${packetId.toString(16)} isn't implemented`);
        }
    }
}

const server = new Server();
(async()=>{
    await server.listen();
})();
