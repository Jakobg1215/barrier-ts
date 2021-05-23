import Server from "../../server";
import Connection from "../Connection";
import Packet from "../packets/Packet";

export default interface Handler<packet extends Packet> {
    id: number;
    handle(packet: packet, server: Server, connection: Connection): void;
}