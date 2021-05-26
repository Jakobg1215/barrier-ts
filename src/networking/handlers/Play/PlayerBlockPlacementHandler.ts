import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import PlayerBlockPlacementPacket from "../../packets/Play/serverbound/PlayerBlockPlacementPacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class PlayerBlockPlacementHandler implements Handler<PlayerBlockPlacementPacket> {
    public id = PlayServerbound.PlayerBlockPlacement;

    public handle(_packet: PlayerBlockPlacementPacket, _server: Server, _player: PlayerConnection) {

    }
}