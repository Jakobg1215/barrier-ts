import type Server from '../../../server';
import PongPacket from '../../packets/Status/Clientbound/PongPacket';
import ResponsePacket from '../../packets/Status/Clientbound/ResponsePacket';
import type RequestPacket from '../../packets/Status/Serverbound/RequestPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { StatusClientbound, StatusServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class RequestHandler implements Handler<RequestPacket> {
    public id = StatusServerbound.Request;

    public async handle(_packet: RequestPacket, server: Server, player: PlayerConnection) {
        const Response = new ResponsePacket();
        Response.JSONResponse = JSON.stringify({
            version: {
                name: '1.16.5',
                protocol: 756,
            },
            players: {
                max: Number(server.getConfig()['max-players']),
                online: server.getPlayerManager().getConnections().size - 1,
            },
            description: {
                text: server.getConfig().motd,
            },
        });
        await player.sendPacket(Response, StatusClientbound.Response);
        const Pong = new PongPacket();
        Pong.Payload = BigInt(Date.now());
        await player.sendPacket(Pong, StatusClientbound.Pong);
    }
}
