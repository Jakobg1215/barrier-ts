import PlayerConnection from './networking/players/PlayerConnection';
import PlayerManager from './networking/players/PlayerManager';
import net from 'net';
import NetworkRegistry from './networking/NetworkRegistry';
import Packet from './networking/packets/Packet';
import World from './world/World';
import PlayerInfoPacket from './networking/packets/Play/clientbound/PlayerInfoPacket';
import { PlayerInfoPlayer } from './networking/types/PacketFieldArguments';
import DestroyEntitiesPacket from './networking/packets/Play/clientbound/DestroyEntitesPacket';

export default class Server {
    private world = new World();
    private server = new net.Server().close();
    private networkRegistry = new NetworkRegistry();
    private playerManager = new PlayerManager();

    public getNetworkRegistry() {
        return this.networkRegistry;
    }

    public getPlayerManager() {
        return this.playerManager;
    }

    public getWorld() {
        return this.world;
    }

    public async listen(port = 25565) {
        await this.networkRegistry.registerNetwork();
        this.server
            .listen(port, () => {
                console.log(`Server is now listening on port: ${port}`);
            })
            .on('connection', connection => {
                const player = new PlayerConnection(connection);
                this.playerManager.addConnection(connection.remoteAddress!, player);
                connection.on('data', async data => {
                    await this.incomingdata(data, player);
                });
                connection.on('close', async () => {
                    const player = this.playerManager.getConnections().get(connection.remoteAddress!);
                    if (player?.getState() === 3) {
                        const DestroyEntity = new DestroyEntitiesPacket();
                        DestroyEntity.Count = 1;
                        DestroyEntity.EntityIDs = [player.getID()];
                        //await this.getPlayerManager().sendPacketAll(DestroyEntity, 0x36);
                        const PlayerInfo = new PlayerInfoPacket();
                        PlayerInfo.Action = 4;
                        PlayerInfo.NumberOfPlayers = 1;
                        const uuid = player?.getUUID() ?? '';
                        const playerfield = class Player implements PlayerInfoPlayer {
                            public UUID = uuid;
                        };
                        PlayerInfo.Player = [new playerfield()];
                        //await this.playerManager.sendPacketAll(PlayerInfo, 0x32);
                    }
                    this.playerManager.removeConnection(connection.remoteAddress!);
                });
                connection.on('error', () => {});
            });
    }

    private async incomingdata(data: Buffer, player: PlayerConnection) {
        const incomePacket = new Packet(data);
        incomePacket.readVarInt(); // Packet Length
        const packetId = incomePacket.readVarInt();
        const packet = this.networkRegistry.getPacket(player.getState(), packetId);
        if (!packet) {
            return console.log(
                `Packet 0x${packetId.toString(
                    16,
                )} for state ${player.getState()} isn't implemented. Entiteid: ${player.getID()}`,
            );
        }
        const hander = this.networkRegistry.getHandler(player.getState(), packetId);
        if (!hander) {
            return console.log(
                `Packet handler 0x${packetId.toString(
                    16,
                )} for state ${player.getState()} isn't implemented. Entiteid: ${player.getID()}`,
            );
        }
        const pk = new packet(incomePacket.getBytes().slice(incomePacket.getOffset()));
        try {
            pk.decrypt();
        } catch (error) {
            console.log(`Packet 0x${packetId.toString(16)} failed with the error ${error}`);
        }
        await hander.handle(pk, this, player);
    }
}

const server = new Server();
(async () => {
    await server.listen();
})();
