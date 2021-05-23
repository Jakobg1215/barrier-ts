import net from "net";
import Connection from "./networking/Connection";
import PacketRegistry from "./networking/NetworkRegistry";
import Packet from "./networking/packets/Packet";

export default class Server {
    private server: net.Server;
    private packetRegistry: PacketRegistry;
    private connections: Map<string, Connection> = new Map();

    public constructor() {
        this.server = new net.Server();
        this.server.close();
        this.packetRegistry = new PacketRegistry();
    }
    public async listen(port = 25565) {
        await this.packetRegistry.registerNetwork();
        this.server.listen(port, () => {
            console.log(`Server is now listening on port: ${port}`);
        });
        this.server.on("connection", conn => {
            const connect = new Connection(conn);
            if (!this.connections.has(conn.remoteAddress!)) {
                this.connections.set(conn.remoteAddress!, connect);
            }
            conn.on("data", async data => {
                await this.incomeingdata(data);
            });
            conn.on("close", () => {
                this.connections.delete(conn.remoteAddress!);
            });
        });
    }
    private async incomeingdata(data: Buffer) {
        const incomePacket = new Packet(data);
        incomePacket.readVarInt();
        const packetId = incomePacket.readVarInt();
        const packet = this.packetRegistry.getPackets().get(packetId);
        if (!packet) {
            return console.log(`Packet 0x${packetId.toString(16)} isn't implemented`);
        }
    }
}

const server = new Server();
server.listen();