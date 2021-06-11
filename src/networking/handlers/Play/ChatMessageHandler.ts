import type Server from '../../../server';
import Chat from '../../../types/Chat';
import Packet from '../../packets/Packet';
import ChatMessagePacketC from '../../packets/Play/clientbound/ChatMessagePacket';
import type ChatMessagePacketS from '../../packets/Play/serverbound/ChatMessagePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class ChatMessageHandler implements Handler<ChatMessagePacketS> {
    public id = PlayServerbound.ChatMessage;

    public async handle(packet: ChatMessagePacketS, server: Server, player: PlayerConnection) {
        if (packet.Message.startsWith('/')) {
            const args = packet.Message.slice(1).split(' ');
            const command = args.shift()?.toLocaleLowerCase();
            switch (command) {
                case 'op': {
                    const pk = new Packet();
                    pk.writeInt(player.getID());
                    pk.writeByte(28);
                    player.sendRaw(pk.buildPacket(PlayClientbound.EntityStatus));
                    const message = new ChatMessagePacketC();
                    message.JSONData = new Chat().translate('commands.op.success', [player.getName()]);
                    message.Position = 1;
                    message.Sender = player.getUUID();
                    await server.getPlayerManager().sendPacketAll(message, PlayClientbound.ChatMessage);
                    break;
                }
                default: {
                    const message = new ChatMessagePacketC();
                    message.JSONData = new Chat().addText(`Unknown or incomplete command; ${command}`, {
                        color: 'red',
                    });
                    message.Position = 1;
                    message.Sender = player.getUUID();
                    return await server.getPlayerManager().sendPacketAll(message, PlayClientbound.ChatMessage);
                }
            }
            return console.log(`${player.getName()} has executed the command ${command}`);
        }
        const message = new ChatMessagePacketC();
        message.JSONData = new Chat().translate('chat.type.text', [player.getName(), packet.Message]);
        message.Position = 0;
        message.Sender = player.getUUID();
        await server.getPlayerManager().sendPacketAll(message, PlayClientbound.ChatMessage);
    }
}
