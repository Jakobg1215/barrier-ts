import type { Socket } from "net";
import { ConnectionStates } from "./types/ConnectionState"

export default class Connection {
    public state = ConnectionStates.Handshaking;
    private socket: Socket;
    public constructor(socket: Socket) {
        this.socket = socket;
        this.socket;
    }
}