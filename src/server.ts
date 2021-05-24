import PlayerConnection from "./networking/players/PlayerConnection";
import PlayerManager from "./networking/players/PlayerManager";
import net from "net";
import NetworkRegistry from "./networking/NetworkRegistry";
import Packet from "./networking/packets/Packet";

export default class Server {
    private server = new net.Server().close();
    private networkRegistry = new NetworkRegistry();
    private playerManager = new PlayerManager();

    public getNetworkRegistry() {
        return this.networkRegistry;
    }

    public async listen(port = 25565) {
        await this.networkRegistry.registerNetwork();
        this.server.listen(port, () => {
            console.log(`Server is now listening on port: ${port}`);
        }).on("connection", connection => {
            const player = new PlayerConnection(connection);
            this.playerManager.addConnection(connection.remoteAddress!, player);
            connection.on("data", async data => {
                await this.incomingdata(data, player);
            });
            connection.on("close", () => {
                this.playerManager.removeConnection(connection.remoteAddress!);
            });
            connection.on("error", () => { });
        });
    }

    private async incomingdata(data: Buffer, player: PlayerConnection) {
        const incomePacket = new Packet(data);
        incomePacket.readVarInt(); // Packet Length
        const packetId = incomePacket.readVarInt();
        const packet = this.networkRegistry.getPacket(player.getState(), packetId);
        if (!packet) {
            return console.log(`Packet 0x${packetId.toString(16)} for state ${player.getState()} isn't implemented`);
        }
        const hander = this.networkRegistry.getHandler(player.getState(), packetId);
        if (!hander) {
            return console.log(`Packet handler 0x${packetId.toString(16)} for state ${player.getState()} isn't implemented`);
        }
        const pk = new packet(incomePacket.getBytes().slice(incomePacket.getOffset()));
        pk.decrypt();
        await hander.handle(pk, this, player);
    }
}

const server = new Server();
(async () => {
    await server.listen();
})();
