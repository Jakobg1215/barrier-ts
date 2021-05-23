import Server from "../../../server"
import Connection from "../../Connection";
import PongPacket from "../../packets/Status/Clientbound/PongPacket";
import PingPacket from "../../packets/Status/Serverbound/PingPacket";
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";
import Handler from "../Handler";

export default class PingHandler implements Handler<PingPacket> {
    public id = StatusServerbound.Ping;

    public handle(packet: PingPacket, _server: Server, connection: Connection) {
        const pk = new PongPacket();
        pk.Payload = packet.Payload;
        connection.sendPacket(pk, StatusClientbound.Pong);
    }
}