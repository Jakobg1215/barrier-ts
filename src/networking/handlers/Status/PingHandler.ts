import type Connection from "../../Connection";
import type Handler from "../Handler";
import type PingPacket from "../../packets/Status/Serverbound/PingPacket";
import PongPacket from "../../packets/Status/Clientbound/PongPacket";
import type Server from "../../../server"
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";

export default class PingHandler implements Handler<PingPacket> {
    public id = StatusServerbound.Ping;

    public handle(packet: PingPacket, _server: Server, connection: Connection) {
        const pk = new PongPacket();
        pk.Payload = packet.Payload;
        connection.sendPacket(pk, StatusClientbound.Pong);
    }
}