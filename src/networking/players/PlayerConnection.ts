import type { Socket } from "net";
import { ConnectionStates } from "../types/ConnectionState";
import type Packet from "../packets/Packet";

export default class PlayerConnection {
    private connection: Socket;
    private connectionState = ConnectionStates.Handshaking;
    private username = "";
    private UUID = "";
    private position = [0, 4, 0];
    private rotation = [0, 0];
    private onGround = true;

    public constructor(socket: Socket) {
        this.connection = socket;
    }

    public async sendPacket(packet: Packet, id: number) {
        packet.encrypt();
        this.connection.write(packet.buildPacket(id));
    }

    public sendRaw(data: Buffer) {
        this.connection.write(data);
    }

    public setState(state: ConnectionStates) {
        this.connectionState = state;
    }

    public getState() {
        return this.connectionState;
    }

    public setName(name: string) {
        this.username = name;
    }

    public getName() {
        return this.username;
    }

    public setUUID(UUID: string) {
        this.UUID = UUID;
    }

    public getUUID() {
        return this.UUID;
    }

    public setPosition(position?: { X?: number, Y?: number, Z?: number }) {
        this.position[0] = position?.X ?? this.position[0];
        this.position[1] = position?.Y ?? this.position[1];
        this.position[2] = position?.Z ?? this.position[3];
    }

    public getPosition() {
        return this.position;
    }

    public setRotation(rotation?: { yaw: number, pitch: number }) {
        this.rotation[0] = rotation?.yaw ?? this.rotation[0];
        this.rotation[1] = rotation?.pitch ?? this.rotation[1];
    }

    public getRotation() {
        return this.rotation;
    }

    public setOnGround(onGound: boolean) {
        this.onGround = onGound;
    }

    public getOnGround() {
        return this.onGround;
    }
}