import type ChatMessagePacket from "../../packets/Play/serverbound/ChatMessagePacket";
import type PlayerConnection from "../../players/PlayerConnection";
import PlayerInfoPacket from "../../packets/Play/clientbound/PlayerInfoPacket";
import type Handler from "../Handler";
import { PlayServerbound, PlayClientbound } from "../../types/PacketIds";
import type Server from "../../../server"
import { PlayerInfoPlayer } from "../../types/PacketFieldArguments";
import SpawnPlayerPacket from "../../packets/Play/clientbound/SpawnPlayerPacket";

export default class ChatMessageHandler implements Handler<ChatMessagePacket> {
    public id = PlayServerbound.ChatMessage;

    public handle(packet: ChatMessagePacket, _server: Server, player: PlayerConnection) {
        if (packet.Message === "/spawn") {
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
            }
            PlayerInfo.Player = [
                new playerfield()
            ];
            player.sendPacket(PlayerInfo, PlayClientbound.PlayerInfo);
            const SpawnPlayer = new SpawnPlayerPacket();
            SpawnPlayer.EntityID = 1;
            SpawnPlayer.PlayerUUID = player.getUUID();
            SpawnPlayer.X = 0;
            SpawnPlayer.Y = 4;
            SpawnPlayer.Z = 0;
            SpawnPlayer.Yaw = 0;
            SpawnPlayer.Pitch = 0;
            player.sendPacket(SpawnPlayer, PlayClientbound.SpawnPlayer);

        }
    }
}