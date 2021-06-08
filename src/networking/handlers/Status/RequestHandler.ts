import type Server from '../../../server';
import ResponsePacket from '../../packets/Status/Clientbound/ResponsePacket';
import type RequestPacket from '../../packets/Status/Serverbound/RequestPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { StatusClientbound, StatusServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class RequestHandler implements Handler<RequestPacket> {
    public id = StatusServerbound.Request;

    public async handle(_packet: RequestPacket, server: Server, player: PlayerConnection) {
        const pk = new ResponsePacket();
        pk.JSONResponse = JSON.stringify({
            version: {
                name: '1.16.5',
                protocol: 755,
            },
            players: {
                max: 100,
                online: server.getPlayerManager().getConnections().size - 1,
            },
            description: {
                text: 'Ha Ha Arrow Go BRRRRRRRRRRRR',
            },
        });
        await player.sendPacket(pk, StatusClientbound.Response);
    }
}
