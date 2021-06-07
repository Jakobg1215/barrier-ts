import fs from 'fs';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

import type Server from '../../../server';
import LoginSuccessPacket from '../../packets/Login/Clientbound/LoginSuccessPacket';
import type LoginStartPacket from '../../packets/Login/Serverbound/LoginStartPacket';
import JoinGamePacket from '../../packets/Play/clientbound/JoinGamePacket';
import PlayerInfoPacket from '../../packets/Play/clientbound/PlayerInfoPacket';
import PlayerPositionAndLookPacket from '../../packets/Play/clientbound/PlayerPositionAndLookPacket';
import SpawnPlayerPacket from '../../packets/Play/clientbound/SpawnPlayerPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { ConnectionStates } from '../../types/ConnectionState';
import { PlayerInfoPlayer } from '../../types/PacketFieldArguments';
import { LoginClientbound, LoginServerbound, PlayClientbound } from '../../types/PacketIds';
import type Handler from '../Handler';

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
        JoinGame.WorldName = 'minecraft:overworld';
        JoinGame.Hashedseed = 0n;
        JoinGame.MaxPlayers = 100;
        JoinGame.ViewDistance = 10;
        JoinGame.ReducedDebugInfo = false;
        JoinGame.Enablerespawnscreen = true;
        JoinGame.IsDebug = false;
        JoinGame.IsFlat = true;
        await player.sendPacket(JoinGame, PlayClientbound.JoinGame);

        await player.sendChunks();

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

        await server.getPlayerManager().sendPacketAll(PlayerInfo, PlayClientbound.PlayerInfo, [player.getID()]);

        await player.sendOnlinePlayers(server);

        const SpawnPlayer = new SpawnPlayerPacket();
        SpawnPlayer.EntityID = player.getID();
        SpawnPlayer.PlayerUUID = player.getUUID();
        SpawnPlayer.X = player.getPosition().getX();
        SpawnPlayer.Y = player.getPosition().getY();
        SpawnPlayer.Z = player.getPosition().getZ();
        SpawnPlayer.Yaw = player.getRotation().getYaw();
        SpawnPlayer.Pitch = player.getRotation().getPitch();

        await server.getPlayerManager().sendPacketAll(SpawnPlayer, PlayClientbound.SpawnPlayer, [player.getID()]);
    }
}
