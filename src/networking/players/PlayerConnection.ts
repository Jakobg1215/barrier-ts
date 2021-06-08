import fs from 'fs';
import type { Socket } from 'net';
import path from 'path';

import type Server from '../../server';
import Position from '../../types/Position';
import Rotation from '../../types/Rotation';
import Packet from '../packets/Packet';
import PlayerInfoPacket from '../packets/Play/clientbound/PlayerInfoPacket';
import SpawnPlayerPacket from '../packets/Play/clientbound/SpawnPlayerPacket';
import { ConnectionStates } from '../types/ConnectionState';
import type { PlayerInfoPlayer } from '../types/PacketFieldArguments';
import { PlayClientbound } from '../types/PacketIds';

export default class PlayerConnection {
    private connection: Socket;
    private connectionState = ConnectionStates.Handshaking;
    private username!: string;
    private UUID!: string;
    private position = new Position(0, 4, 0);
    private rotation = new Rotation(0, 0);
    private onGround = true;
    private id!: number;

    public constructor(socket: Socket) {
        this.connection = socket;
    }

    public async sendPacket(packet: Packet, id: number) {
        packet.encrypt();
        this.connection.write(packet.buildPacket(id));
    }

    public async sendRaw(data: Buffer) {
        this.connection.write(data);
    }

    public async sendOnlinePlayers(server: Server) {
        return Promise.resolve().then(async _v => {
            const PlayerInfo = new PlayerInfoPacket();
            PlayerInfo.Action = 0;
            PlayerInfo.Player = [];
            const playerfield = class Player implements PlayerInfoPlayer {
                public constructor(name: string, uuid: string) {
                    this.Name = name;
                    this.UUID = uuid;
                    this.DisplayName = JSON.stringify({ text: this.Name });
                }
                public Name!: string;
                public UUID!: string;
                public NumberOfProperties = 0;
                public Gamemode = 1;
                public Ping = 0;
                public HasDisplayName = true;
                public DisplayName!: string;
            };
            server
                .getPlayerManager()
                .getConnections()
                .forEach(async conn => {
                    PlayerInfo.Player.push(new playerfield(conn.username, conn.UUID));
                });
            PlayerInfo.NumberOfPlayers = PlayerInfo.Player.length;
            await this.sendPacket(PlayerInfo, PlayClientbound.PlayerInfo + 1);

            server
                .getPlayerManager()
                .getConnections()
                .forEach(async conn => {
                    if (conn.UUID === this.UUID) return;
                    let yaw = Math.round(conn.rotation.getYaw());
                    while (yaw > 360 || yaw < -360) {
                        if (yaw > 360) {
                            yaw -= 360;
                        }
                        if (yaw < -360) {
                            yaw += 360;
                        }
                    }
                    yaw = Math.round(yaw / (360 / 255));
                    if (yaw < 0) yaw = 255 + yaw;
                    let pitch =
                        conn.rotation.getPitch() > 0
                            ? (conn.rotation.getPitch() * 65) / 90
                            : 255 - (Math.abs(conn.rotation.getPitch()) * 65) / 90;
                    const SpawnPlayer = new SpawnPlayerPacket();
                    SpawnPlayer.EntityID = conn.id;
                    SpawnPlayer.PlayerUUID = conn.UUID;
                    SpawnPlayer.X = conn.position.getX();
                    SpawnPlayer.Y = conn.position.getY();
                    SpawnPlayer.Z = conn.position.getZ();
                    SpawnPlayer.Yaw = yaw;
                    SpawnPlayer.Pitch = pitch;
                    await this.sendPacket(SpawnPlayer, PlayClientbound.SpawnPlayer);
                });
        });
    }

    public async sendChunks() {
        return Promise.resolve().then(async _v => {
            const chunk = fs.readFileSync(path.join(__dirname, '../../../NBT/chunk.nbt'));
            for (let x = -8; x < 8; x++) {
                for (let z = -8; z < 8; z++) {
                    const pk = new Packet();
                    pk.writeInt(x);
                    pk.writeInt(z);
                    pk.append(chunk);
                    await this.sendRaw(pk.buildPacket(PlayClientbound.ChunkData));
                }
            }
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

    public setPosition(position?: { X?: number; Y?: number; Z?: number }) {
        this.position.setX(position?.X ?? this.position.getX());
        this.position.setY(position?.Y ?? this.position.getY());
        this.position.setZ(position?.Z ?? this.position.getZ());
    }

    public getPosition() {
        return this.position;
    }

    public setRotation(rotation?: { yaw: number; pitch: number }) {
        this.rotation.setYaw(rotation?.yaw ?? this.rotation.getYaw());
        this.rotation.setPitch(rotation?.pitch ?? this.rotation.getPitch());
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
        this.id = id;
    }

    public getID() {
        return this.id;
    }
}
