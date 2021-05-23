import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import path from "path";
import Server from "../../../server"
import Connection from "../../Connection";
import LoginSuccessPacket from "../../packets/Login/Clientbound/LoginSuccessPacket";
import LoginStartPacket from "../../packets/Login/Serverbound/LoginStartPacket";
import JoinGamePacket from '../../packets/Play/clientbound/JoinGamePacket';
import { LoginServerbound, LoginClientbound, PlayClientbound } from "../../types/PacketIds";
import Handler from "../Handler";
import PlayerPositionAndLookPacket from '../../packets/Play/clientbound/PlayerPositionAndLookPacket';
import { ConnectionStates } from '../../types/ConnectionState';
import Packet from '../../packets/Packet';

export default class LoginStartHandler implements Handler<LoginStartPacket> {
    public id = LoginServerbound.LoginStart;

    public handle(packet: LoginStartPacket, _server: Server, connection: Connection) {
        connection.state = ConnectionStates.Play;
        connection.name = packet.Name;
        connection.uuid = uuidv4();
        const LoginSuccess = new LoginSuccessPacket();
        LoginSuccess.UUID = connection.uuid;
        LoginSuccess.Username = packet.Name;
        connection.sendPacket(LoginSuccess, LoginClientbound.LoginSuccess);
        const JoinGame = new JoinGamePacket();
        JoinGame.EntityID = 0;
        JoinGame.Ishardcore = false;
        JoinGame.Gamemode = 1;
        JoinGame.PreviousGamemode = 1;
        JoinGame.WorldCount = 3;
        JoinGame.WorldNames = [
            "minecraft:overworld",
            "minecraft:the_nether",
            "minecraft:the_end"
        ];
        JoinGame.DimensionCodec = fs.readFileSync(path.join(__dirname, "../../../../NBT/Dimension Codec.nbt"));
        JoinGame.WorldName = "minecraft:the_end";
        JoinGame.Hashedseed = 0n;
        JoinGame.MaxPlayers = 100;
        JoinGame.ViewDistance = 10;
        JoinGame.ReducedDebugInfo = false;
        JoinGame.Enablerespawnscreen = true;
        JoinGame.IsDebug = false;
        JoinGame.IsFlat = true;
        connection.sendPacket(JoinGame, PlayClientbound.JoinGame);
        for (let x = -5; x < 5; x++) {
            for (let z = -5; z < 5; z++) {
                const chunk = fs.readFileSync(path.join(__dirname, "../../../../NBT/chunk.nbt"));
                const pk = new Packet();
                pk.writeInt(x);
                pk.writeInt(z);
                pk.append(chunk.slice(11));
                connection.sendRaw(pk.buildPacket(PlayClientbound.ChunkData));
            }
        }
        console.log("chunk");
        const PlayerPositionAndLook = new PlayerPositionAndLookPacket();
        PlayerPositionAndLook.X = 0;
        PlayerPositionAndLook.Y = 4;
        PlayerPositionAndLook.Z = 0;
        PlayerPositionAndLook.Yaw = 0;
        PlayerPositionAndLook.Pitch = 0;
        PlayerPositionAndLook.Flags = 0;
        PlayerPositionAndLook.TeleportID = 0;
        connection.sendPacket(PlayerPositionAndLook, PlayClientbound.PlayerPositionAndLook);
    }
}