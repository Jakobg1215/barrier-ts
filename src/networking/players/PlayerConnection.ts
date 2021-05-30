import type { Socket } from "net";
import { ConnectionStates } from "../types/ConnectionState";
import type Packet from "../packets/Packet";
import type Server from "../../server";
import PlayerInfoPacket from "../packets/Play/clientbound/PlayerInfoPacket";
import { PlayClientbound } from "../types/PacketIds";
import type { PlayerInfoPlayer } from "../types/PacketFieldArguments";
import SpawnPlayerPacket from "../packets/Play/clientbound/SpawnPlayerPacket";

export default class PlayerConnection {
    private connection: Socket;
    private connectionState = ConnectionStates.Handshaking;
    private username!: string;
    private UUID!: string;
    private position = [0, 4, 0];
    private rotation = [0, 0];
    private onGround = true;
    private id!: number;

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

    public async sendOnlinePlayers(server: Server) {
        server.getPlayerManager().getConnections().forEach(async conn => {
            if (conn.getUUID() === this.UUID) return;
            if (conn.getState() < 3) return;
            const PlayerInfo = new PlayerInfoPacket();
            PlayerInfo.Action = 0;
            PlayerInfo.NumberOfPlayers = 1;
            const playerfield = class Player implements PlayerInfoPlayer {
                public UUID = conn.getUUID();
                public Name = conn.getName();
                public NumberOfProperties = 0;
                public Gamemode = 1;
                public Ping = 0;
                public HasDisplayName = true;
                public DisplayName = JSON.stringify({ text: conn.getName() });
            }
            PlayerInfo.Player = [
                new playerfield()
            ];
            console.log(PlayerInfo.Player[0].UUID);
            await this.sendPacket(PlayerInfo, PlayClientbound.PlayerInfo);
            const SpawnPlayer = new SpawnPlayerPacket();
            SpawnPlayer.EntityID = conn.getID();
            SpawnPlayer.PlayerUUID = conn.getUUID();
            SpawnPlayer.X = conn.getPosition()[0];
            SpawnPlayer.Y = conn.getPosition()[1];
            SpawnPlayer.Z = conn.getPosition()[2];
            SpawnPlayer.Yaw = conn.getRotation()[0];
            SpawnPlayer.Pitch = conn.getRotation()[0];
            await this.sendPacket(SpawnPlayer, PlayClientbound.SpawnPlayer);
        });
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

    public setid(id: number) {
        this.id = id
    }

    public getID() {
        return this.id;
    }
}