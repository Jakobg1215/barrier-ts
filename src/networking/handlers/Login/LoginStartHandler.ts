import crypto from 'crypto';
import fs from 'fs';
import https from 'https';
import path from 'path';

import type Server from '../../../server';
import Chat from '../../../types/Chat';
import DisconnectPacket from '../../packets/Login/Clientbound/DisconnectPacket';
import LoginSuccessPacket from '../../packets/Login/Clientbound/LoginSuccessPacket';
import type LoginStartPacket from '../../packets/Login/Serverbound/LoginStartPacket';
import Packet from '../../packets/Packet';
import JoinGamePacket from '../../packets/Play/clientbound/JoinGamePacket';
import PlayerInfoPacket from '../../packets/Play/clientbound/PlayerInfoPacket';
import PlayerPositionAndLookPacket from '../../packets/Play/clientbound/PlayerPositionAndLookPacket';
import PluginMessagePacket from '../../packets/Play/clientbound/PluginMessagePacket';
import SpawnPlayerPacket from '../../packets/Play/clientbound/SpawnPlayerPacket';
import TimeUpdatePacket from '../../packets/Play/clientbound/TimeUpdatePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { ConnectionStates } from '../../types/ConnectionState';
import { PlayerInfoPlayer, PlayerInfoPlayerProperty } from '../../types/PacketFieldArguments';
import { LoginClientbound, LoginServerbound, PlayClientbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class LoginStartHandler implements Handler<LoginStartPacket> {
    public id = LoginServerbound.LoginStart;

    public async handle(packet: LoginStartPacket, server: Server, player: PlayerConnection) {
        const login = async () => {
            const LoginSuccess = new LoginSuccessPacket();
            LoginSuccess.UUID = player.getUUID();
            LoginSuccess.Username = packet.Name;
            await player.sendPacket(LoginSuccess, LoginClientbound.LoginSuccess);
            player.setState(ConnectionStates.Play);

            server.getConsole().log(`${packet.Name} is joining the server`);

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
            JoinGame.MaxPlayers = server.getConfig()['max-players'];
            JoinGame.ViewDistance = 10;
            JoinGame.ReducedDebugInfo = false;
            JoinGame.Enablerespawnscreen = true;
            JoinGame.IsDebug = false;
            JoinGame.IsFlat = true;
            await player.sendPacket(JoinGame, PlayClientbound.JoinGame);

            await player.sendChunks();

            const timeupdate = new TimeUpdatePacket();
            timeupdate.WorldAge = BigInt(server.getWorld().getworldage());
            timeupdate.Timeofday = BigInt(server.getWorld().gettime());
            await player.sendPacket(timeupdate, PlayClientbound.TimeUpdate);

            const PluginMessage = new PluginMessagePacket();
            PluginMessage.Channel = 'minecraft:brand';
            PluginMessage.Data = Packet.fromString(server.getConfig()['server-name']);
            await player.sendPacket(PluginMessage, PlayClientbound.PluginMessage);

            const PlayerPositionAndLook = new PlayerPositionAndLookPacket();
            PlayerPositionAndLook.X = 0;
            PlayerPositionAndLook.Y = 4;
            PlayerPositionAndLook.Z = 0;
            PlayerPositionAndLook.Yaw = 0;
            PlayerPositionAndLook.Pitch = 0;
            PlayerPositionAndLook.Flags = 0;
            PlayerPositionAndLook.TeleportID = 0;
            PlayerPositionAndLook.DismountVehicle = false;
            await player.sendPacket(PlayerPositionAndLook, PlayClientbound.PlayerPositionAndLook);

            const PlayerInfo = new PlayerInfoPacket();
            PlayerInfo.Action = 0;
            PlayerInfo.NumberOfPlayers = 1;
            const playerinfoplayer: PlayerInfoPlayer = {
                UUID: player.getUUID(),
                Name: player.getName(),
                NumberOfProperties: player.getSkins().length,
                Property: player.getSkins().map(val => {
                    const prop: PlayerInfoPlayerProperty = {
                        Name: val.name,
                        Value: val.value,
                        IsSigned: val.signature ?? false,
                        Signature: val.signature,
                    };
                    return prop;
                }),
            };
            PlayerInfo.Player = [playerinfoplayer];
            await server.getPlayerManager().sendPacketAll(PlayerInfo, PlayClientbound.PlayerInfo, [player.getID()]);
            await player.sendOnlinePlayers(server);

            const SpawnPlayer = new SpawnPlayerPacket();
            SpawnPlayer.EntityID = player.getID();
            SpawnPlayer.PlayerUUID = player.getUUID();
            SpawnPlayer.X = player.getPosition().getX();
            SpawnPlayer.Y = player.getPosition().getY();
            SpawnPlayer.Z = player.getPosition().getZ();
            SpawnPlayer.Yaw = player.getRotation().getx();
            SpawnPlayer.Pitch = player.getRotation().gety();

            await server.getPlayerManager().sendPacketAll(SpawnPlayer, PlayClientbound.SpawnPlayer, [player.getID()]);
        };
        if (server.getPlayerManager().getConnections().size - 1 >= server.getConfig()['max-players']) {
            const disconnect = new DisconnectPacket();
            disconnect.Reason = new Chat().addText('Server is full');
            return await player.sendPacket(disconnect, LoginClientbound.Disconnect);
        }
        https
            .get(`https://api.mojang.com/users/profiles/minecraft/${packet.Name}?at=${Date.now()}`, res => {
                if (res.statusCode !== 200) {
                    player.setName(packet.Name);
                    player.setUUID(crypto.randomUUID());
                    login();
                    return;
                }
                res.on('data', data => {
                    const res = JSON.parse(data.toString());
                    player.setName(res.name);
                    player.setUUID(res.id);
                    https
                        .get(`https://sessionserver.mojang.com/session/minecraft/profile/${res.id}`, res => {
                            if (res.statusCode !== 200) {
                                login();
                                return;
                            }
                            res.on('data', data => {
                                player.setSkins(JSON.parse(data.toString()).properties);
                                login();
                            });
                        })
                        .on('error', err => {
                            server.getConsole().error(err);
                            login();
                        });
                });
            })
            .on('error', err => {
                server.getConsole().error(err);
                player.setName(packet.Name);
                player.setUUID(crypto.randomUUID());
                login();
            });
    }
}
