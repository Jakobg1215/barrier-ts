import type { Socket } from "net";
import Packet from "./packets/Packet";
import { ConnectionStates } from "./types/ConnectionState"

export default class Connection {
    public uuid = "";
    public name = "";
    public state = ConnectionStates.Handshaking;
    public keepAliveId!: bigint;
    private socket: Socket;
    public constructor(socket: Socket) {
        this.socket = socket;
        this.socket;
    }
    public sendPacket(packet: Packet, id: number) {
        packet.encrypt();
        this.socket.write(packet.buildPacket(id));
    }
    public sendRaw(data: Buffer) {
        this.socket.write(data);
    }
}