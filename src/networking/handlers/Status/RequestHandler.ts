import Server from "../../../server"
import Connection from "../../Connection";
import ResponsePacket from "../../packets/Status/Clientbound/ResponsePacket";
import RequestPacket from "../../packets/Status/Serverbound/RequestPacket";
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";
import Handler from "../Handler";

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