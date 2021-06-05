import type Server from '../../../server';
import Chat from '../../../types/Chat';
import ChatMessagePacketC from '../../packets/Play/clientbound/ChatMessagePacket';
import type ChatMessagePacketS from '../../packets/Play/serverbound/ChatMessagePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class ChatMessageHandler implements Handler<ChatMessagePacketS> {
    public id = PlayServerbound.ChatMessage;

    public async handle(packet: ChatMessagePacketS, server: Server, player: PlayerConnection) {
        const message = new ChatMessagePacketC();
        message.JSONData = new Chat().translate('chat.type.text', [player.getName(), packet.Message]);
        message.Position = 0;
        message.Sender = player.getUUID();
        await server.getPlayerManager().sendPacketAll(message, PlayClientbound.ChatMessage);
    }
}
