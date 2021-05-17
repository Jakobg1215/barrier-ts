import net from "net";
import fs from "fs";
import path from "path";
import Packet from "./networking/Packet";
import * as types from "./types/types";

let connections: net.Socket[] = [];

const server = net.createServer(socket => {
    connections.push(socket);
    let state = 0;
    socket.on("data", data => {
        const inboundPacket = new Packet(data);
        const inboundPacketLength = inboundPacket.readVarInt();
        const inboundPacketId = inboundPacket.readVarInt();
        switch (inboundPacketId) {
            case 0x00:
                switch (state) {
                    case 0:
                        const Handshake: types.Handshake = {
                            ProtocolVersion: inboundPacket.readVarInt(),
                            ServerAddress: inboundPacket.readString(),
                            ServerPort: inboundPacket.readUnsignedShort(),
                            NextState: inboundPacket.readVarInt()
                        };
                        state = Handshake.NextState;
                        if (state === 1) {
                            const Response = new Packet();
                            Response.writeString(JSON.stringify({
                                version: {
                                    name: "1.16.5",
                                    protocol: 754
                                },
                                players: {
                                    max: 20,
                                    online: 12
                                }
                            }));
                            socket.write(Response.buildPacket(0x00));
                            break;
                        }
                        if (state === 2) {
                            try {
                                inboundPacket.readVarInt();
                                inboundPacket.readVarInt();
                            } catch {
                                break;
                            }
                        }
                    case 2:
                        const LoginSuccess = new Packet();
                        LoginSuccess.writeUUID("8a12c58f-0dfa-4227-bd6f-a8f6f3d93cd7");
                        LoginSuccess.writeString(inboundPacket.readString());
                        socket.write(LoginSuccess.buildPacket(0x02));
                        const JoinGame = new Packet();
                        JoinGame.writeInt(0);
                        JoinGame.writeBoolean(true);
                        JoinGame.writeUnsignedByte(1);
                        JoinGame.writeByte(-1);
                        JoinGame.writeVarInt(3);
                        JoinGame.writeString("minecraft:overworld");
                        JoinGame.writeString("minecraft:the_nether");
                        JoinGame.writeString("minecraft:the_end");
                        JoinGame.append(fs.readFileSync(path.join(__dirname, "../../NBT/Dimension Codec.nbt")));
                        JoinGame.writeString("minecraft:overworld");
                        JoinGame.writeLong(BigInt(0));
                        JoinGame.writeVarInt(10);
                        JoinGame.writeVarInt(10);
                        JoinGame.writeBoolean(false);
                        JoinGame.writeBoolean(true);
                        JoinGame.writeBoolean(false);
                        JoinGame.writeBoolean(true);
                        socket.write(JoinGame.buildPacket(0x24));
                        for (let x = -8; x < 8; x++) {
                            for (let z = -8; z < 8; z++) {
                                const chunk = new Packet(fs.readFileSync(path.join(__dirname, "../../NBT/chunk.nbt")));
                                const ChunkData = new Packet();
                                ChunkData.writeInt(x);
                                ChunkData.writeInt(z);
                                chunk.readVarInt();
                                chunk.readVarInt();
                                chunk.readInt();
                                chunk.readInt();
                                ChunkData.append(chunk.getBuffer().slice(chunk.getOffset()));
                                socket.write(ChunkData.buildPacket(0x20));
                            }
                        }
                        connections.forEach(connection => {
                            if (connection.address() !== socket.address()) {
                                
                            }
                        });
                        const PlayerPositionAndLook = new Packet();
                        PlayerPositionAndLook.writeDouble(0);
                        PlayerPositionAndLook.writeDouble(4);
                        PlayerPositionAndLook.writeDouble(0);
                        PlayerPositionAndLook.writeFloat(0);
                        PlayerPositionAndLook.writeFloat(0);
                        PlayerPositionAndLook.writeByte(0);
                        PlayerPositionAndLook.writeVarInt(1);
                        socket.write(PlayerPositionAndLook.buildPacket(0x34));
                        state = 3;
                        setInterval(() => {
                            const KeepAlive = new Packet();
                            KeepAlive.writeLong(BigInt(0));
                            socket.write(KeepAlive.buildPacket(0x1F));
                        }, 50);
                        break;
                    case 1:
                        const Response = new Packet();
                        Response.writeString(JSON.stringify({
                            version: {
                                name: "1.16.5",
                                protocol: 754
                            },
                            players: {
                                max: 20,
                                online: 12
                            }
                        }));
                        socket.write(Response.buildPacket(0x00));
                        break;
                    case 3:
                        break;
                }
                break;
            case 0x01:
                switch (state) {
                    case 1:
                        const Pong = new Packet();
                        Pong.writeLong(inboundPacket.readLong());
                        socket.write(Pong.buildPacket(0x01));
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
                break;
            case 0x03: // Chat Message
                const ChatMessage = inboundPacket.readString();
                ChatMessage;
                break;
            case 0x10: // Keep Alive
                break;
            case 0x12: // Player Position
                const PlayerPosition: types.PlayerPosition = {
                    X: inboundPacket.readDouble(),
                    FeetY: inboundPacket.readDouble(),
                    Z: inboundPacket.readDouble(),
                    OnGround: inboundPacket.readBoolean()
                }
                PlayerPosition;
                break;
            case 0x13: // Player Position And Rotation (serverbound)
                const PlayerPositionAndRotation: types.PlayerPositionAndRotation = {
                    X: inboundPacket.readDouble(),
                    FeetY: inboundPacket.readDouble(),
                    Z: inboundPacket.readDouble(),
                    Yaw: inboundPacket.readFloat(),
                    Pitch: inboundPacket.readFloat(),
                    OnGround: inboundPacket.readBoolean()
                }
                PlayerPositionAndRotation;
                break;
            case 0x14: // Player Rotation
                break;
            default:
                console.log(`Length: ${inboundPacketLength} Id: ${inboundPacketId} State: ${state}`);
        }
    });
    socket.on("error", err => console.log(err));
    socket.on("end", () => {
        connections = connections.slice(connections.indexOf(socket), 1);
    });
});

server.listen(25565);