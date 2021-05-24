import type Connection from "../Connection";
import type Packet from "../packets/Packet";
import type Server from "../../server";

export default interface Handler<packet extends Packet> {
    id: number;
    handle(packet: packet, server: Server, connection: Connection): void;
}