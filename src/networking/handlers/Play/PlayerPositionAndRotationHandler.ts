import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerPositionAndRotationPacket from "../../packets/Play/serverbound/PlayerPositionAndRotationPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class PlayerPositionAndRotationHandler implements Handler<PlayerPositionAndRotationPacket> {
    public id = PlayServerbound.PlayerPositionAndRotation;

    public handle(packet: PlayerPositionAndRotationPacket, _server: Server, player: PlayerConnection) {
        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
        player.setRotation({ yaw: packet.Yaw, pitch: packet.Pitch });
        player.setOnGround(packet.OnGround);
    }
}