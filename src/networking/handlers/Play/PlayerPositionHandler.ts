import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerPositionPacket from "../../packets/Play/serverbound/PlayerPositionPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class PlayerPositionHandler implements Handler<PlayerPositionPacket> {
    public id = PlayServerbound.PlayerPosition;

    public handle(packet: PlayerPositionPacket, _server: Server, player: PlayerConnection) {
        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
        player.setOnGround(packet.OnGround);
    }
}