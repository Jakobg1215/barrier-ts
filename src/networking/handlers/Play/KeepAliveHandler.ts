import Server from "../../../server"
import Connection from "../../Connection";
import KeepAlivePacket from "../../packets/Play/clientbound/KeepAlivePacket";
import { PlayServerbound } from "../../types/PacketIds";
import Handler from "../Handler";


export default class KeepAliveHandler implements Handler<KeepAlivePacket> {
    public id = PlayServerbound.KeepAlive;

    public handle(_packet: KeepAlivePacket, _server: Server, _connection: Connection) {

    }
}