import type Connection from "../../Connection";
import type Handler from "../Handler";
import type RequestPacket from "../../packets/Status/Serverbound/RequestPacket";
import ResponsePacket from "../../packets/Status/Clientbound/ResponsePacket";
import type Server from "../../../server"
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";

export default class RequestHandler implements Handler<RequestPacket> {
    public id = StatusServerbound.Request;

    public handle(_packet: RequestPacket, _server: Server, connection: Connection) {
        const pk = new ResponsePacket();
        pk.JSONResponse = JSON.stringify({
            version: {
                name: "1.16.5",
                protocol: 754
            },
            players: {
                max: 100,
                online: 5
            },
            description: {
                text: "Hello world"
            },
        });
        connection.sendPacket(pk, StatusClientbound.Response);
    }
}