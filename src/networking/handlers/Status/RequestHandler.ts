import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import type RequestPacket from "../../packets/Status/Serverbound/RequestPacket";
import ResponsePacket from "../../packets/Status/Clientbound/ResponsePacket";
import type Server from "../../../server"
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";

export default class RequestHandler implements Handler<RequestPacket> {
    public id = StatusServerbound.Request;

    public async handle(_packet: RequestPacket, server: Server, player: PlayerConnection) {
        const pk = new ResponsePacket();
        pk.JSONResponse = JSON.stringify({
            version: {
                name: "1.16.5",
                protocol: 754
            },
            players: {
                max: 100,
                online: server.getPlayerManager().getConnections().size - 1
            },
            description: {
                text: "Hello world"
            },
        });
        await player.sendPacket(pk, StatusClientbound.Response);
    }
}