import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerRotationPacket from "../../packets/Play/serverbound/PlayerRotationPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class PlayerRotationHandler implements Handler<PlayerRotationPacket> {
    public id = PlayServerbound.PlayerRotation;

    public handle(packet: PlayerRotationPacket, _server: Server, player: PlayerConnection) {
        player.setRotation({ yaw: packet.Yaw, pitch: packet.Pitch });
        player.setOnGround(packet.OnGround);
    }
}