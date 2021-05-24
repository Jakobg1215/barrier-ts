import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import type PingPacket from "../../packets/Status/Serverbound/PingPacket";
import PongPacket from "../../packets/Status/Clientbound/PongPacket";
import type Server from "../../../server"
import { StatusServerbound, StatusClientbound } from "../../types/PacketIds";

export default class PingHandler implements Handler<PingPacket> {
    public id = StatusServerbound.Ping;

    public async handle(packet: PingPacket, _server: Server, player: PlayerConnection) {
        const pk = new PongPacket();
        pk.Payload = packet.Payload;
        await player.sendPacket(pk, StatusClientbound.Pong);
    }
}