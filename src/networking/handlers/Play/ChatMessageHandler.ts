import type ChatMessagePacket from "../../packets/Play/serverbound/ChatMessagePacket";
import type PlayerConnection from "../../players/PlayerConnection";
import type Handler from "../Handler";
import { PlayServerbound } from "../../types/PacketIds";
import type Server from "../../../server"

export default class ChatMessageHandler implements Handler<ChatMessagePacket> {
    public id = PlayServerbound.ChatMessage;

    public handle(_packet: ChatMessagePacket, _server: Server, _player: PlayerConnection) {

    }
}