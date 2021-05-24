import type PlayerConnection from "../../players/PlayerConnection";
import { ConnectionStates } from '../../types/ConnectionState';
import fs from "fs";
import type Handler from "../Handler";
import JoinGamePacket from '../../packets/Play/clientbound/JoinGamePacket';
import { LoginServerbound, LoginClientbound, PlayClientbound } from "../../types/PacketIds";
import type LoginStartPacket from "../../packets/Login/Serverbound/LoginStartPacket";
import LoginSuccessPacket from "../../packets/Login/Clientbound/LoginSuccessPacket";
import Packet from '../../packets/Packet';
import path from "path";
import PlayerPositionAndLookPacket from '../../packets/Play/clientbound/PlayerPositionAndLookPacket';
import type Server from "../../../server";
import { v4 as uuidv4 } from "uuid";

export default class LoginStartHandler implements Handler<LoginStartPacket> {
    public id = LoginServerbound.LoginStart;

    public async handle(packet: LoginStartPacket, _server: Server, player: PlayerConnection) {
        player.setName(packet.Name);
        player.setUUID(uuidv4());
        const LoginSuccess = new LoginSuccessPacket();
        LoginSuccess.UUID = player.getUUID();
        LoginSuccess.Username = packet.Name;
        await player.sendPacket(LoginSuccess, LoginClientbound.LoginSuccess);
        player.setState(ConnectionStates.Play);
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
        await player.sendPacket(JoinGame, PlayClientbound.JoinGame);
        for (let x = -5; x < 5; x++) {
            for (let z = -5; z < 5; z++) {
                const chunk = fs.readFileSync(path.join(__dirname, "../../../../NBT/chunk.nbt"));
                const pk = new Packet();
                pk.writeInt(x);
                pk.writeInt(z);
                pk.append(chunk.slice(11));
                player.sendRaw(pk.buildPacket(PlayClientbound.ChunkData));
            }
        }
        const PlayerPositionAndLook = new PlayerPositionAndLookPacket();
        PlayerPositionAndLook.X = 0;
        PlayerPositionAndLook.Y = 4;
        PlayerPositionAndLook.Z = 0;
        PlayerPositionAndLook.Yaw = 0;
        PlayerPositionAndLook.Pitch = 0;
        PlayerPositionAndLook.Flags = 0;
        PlayerPositionAndLook.TeleportID = 0;
        await player.sendPacket(PlayerPositionAndLook, PlayClientbound.PlayerPositionAndLook);
    }
}