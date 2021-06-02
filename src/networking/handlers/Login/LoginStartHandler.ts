import type PlayerConnection from '../../players/PlayerConnection';
import { ConnectionStates } from '../../types/ConnectionState';
import fs from 'fs';
import type Handler from '../Handler';
import JoinGamePacket from '../../packets/Play/clientbound/JoinGamePacket';
import { LoginServerbound, LoginClientbound, PlayClientbound } from '../../types/PacketIds';
import type LoginStartPacket from '../../packets/Login/Serverbound/LoginStartPacket';
import LoginSuccessPacket from '../../packets/Login/Clientbound/LoginSuccessPacket';
import Packet from '../../packets/Packet';
import path from 'path';
import PlayerPositionAndLookPacket from '../../packets/Play/clientbound/PlayerPositionAndLookPacket';
import type Server from '../../../server';
import { v4 as uuidv4 } from 'uuid';
import PlayerInfoPacket from '../../packets/Play/clientbound/PlayerInfoPacket';
import { PlayerInfoPlayer } from '../../types/PacketFieldArguments';
import SpawnPlayerPacket from '../../packets/Play/clientbound/SpawnPlayerPacket';

export default class LoginStartHandler implements Handler<LoginStartPacket> {
    public id = LoginServerbound.LoginStart;

    public async handle(packet: LoginStartPacket, server: Server, player: PlayerConnection) {
        player.setName(packet.Name);
        player.setUUID(uuidv4());
        const LoginSuccess = new LoginSuccessPacket();
        LoginSuccess.UUID = player.getUUID();
        LoginSuccess.Username = packet.Name;
        await player.sendPacket(LoginSuccess, LoginClientbound.LoginSuccess);
        player.setState(ConnectionStates.Play);

        const JoinGame = new JoinGamePacket();
        player.setid(server.getWorld().getId());
        JoinGame.EntityID = player.getID();
        JoinGame.Ishardcore = false;
        JoinGame.Gamemode = 1;
        JoinGame.PreviousGamemode = 1;
        JoinGame.WorldCount = 3;
        JoinGame.WorldNames = ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'];
        JoinGame.DimensionCodec = fs.readFileSync(path.join(__dirname, '../../../../NBT/Dimension Codec.nbt'));
        JoinGame.WorldName = 'minecraft:the_end';
        JoinGame.Hashedseed = 0n;
        JoinGame.MaxPlayers = 100;
        JoinGame.ViewDistance = 10;
        JoinGame.ReducedDebugInfo = false;
        JoinGame.Enablerespawnscreen = true;
        JoinGame.IsDebug = false;
        JoinGame.IsFlat = true;
        await player.sendPacket(JoinGame, PlayClientbound.JoinGame);

        for (let x = -10; x < 10; x++) {
            for (let z = -10; z < 10; z++) {
                const chunk = fs.readFileSync(path.join(__dirname, '../../../../NBT/chunk.nbt'));
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

        const PlayerInfo = new PlayerInfoPacket();
        PlayerInfo.Action = 0;
        PlayerInfo.NumberOfPlayers = 1;
        const playerfield = class Player implements PlayerInfoPlayer {
            public UUID = player.getUUID();
            public Name = player.getName();
            public NumberOfProperties = 0;
            public Gamemode = 1;
            public Ping = 0;
            public HasDisplayName = true;
            public DisplayName = JSON.stringify({ text: player.getName() });
        };
        PlayerInfo.Player = [new playerfield()];

        await player.sendOnlinePlayers(server);

        server
            .getPlayerManager()
            .getConnections()
            .forEach(async conn => {
                if (conn.getUUID() === player.getUUID()) return;
                await conn.sendPacket(PlayerInfo, PlayClientbound.PlayerInfo);
            });
        await player.sendPacket(PlayerInfo, PlayClientbound.PlayerInfo);

        server
            .getPlayerManager()
            .getConnections()
            .forEach(async conn => {
                if (conn.getUUID() === player.getUUID()) return;
                const SpawnPlayer = new SpawnPlayerPacket();
                SpawnPlayer.EntityID = player.getID();
                SpawnPlayer.PlayerUUID = player.getUUID();
                SpawnPlayer.X = player.getPosition()[0];
                SpawnPlayer.Y = player.getPosition()[1];
                SpawnPlayer.Z = player.getPosition()[2];
                SpawnPlayer.Yaw = player.getRotation()[0];
                SpawnPlayer.Pitch = player.getRotation()[0];
                await conn.sendPacket(SpawnPlayer, PlayClientbound.SpawnPlayer);
            });
    }
}
