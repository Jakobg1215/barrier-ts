import type Connection from "../../Connection";
import type Handler from "../Handler";
import type KeepAlivePacket from "../../packets/Play/clientbound/KeepAlivePacket";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class KeepAliveHandler implements Handler<KeepAlivePacket> {
    public id = PlayServerbound.KeepAlive;

    public handle(_packet: KeepAlivePacket, _server: Server, _connection: Connection) {

    }
}