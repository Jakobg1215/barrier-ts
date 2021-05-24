import type PlayerConnection from "../players/PlayerConnection";
import type Packet from "../packets/Packet";
import type Server from "../../server";

export default interface Handler<packet extends Packet> {
    id: number;
    handle(packet: packet, server: Server, player: PlayerConnection): void | Promise<void>;
}