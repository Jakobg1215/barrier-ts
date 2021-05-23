import type { Socket } from "net";

export default class Connection {
    public state = 0;
    private socket: Socket;
    public constructor(socket: Socket) {
        this.socket = socket;
        this.socket;
    }
}