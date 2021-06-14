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
                    await player.sendPacket(message, PlayClientbound.ChatMessage);
                    break;
                }
                case 'gamemode': {
                    let gamemode;
                    const pk = new Packet();
                    pk.writeUnsignedByte(3);
                    switch (args[0].toLocaleLowerCase()) {
                        case '0':
                        case 'survival':
                            pk.writeFloat(0);
                            gamemode = 'Survival Mode';
                            break;
                        case '1':
                        case 'creative':
                            pk.writeFloat(1);
                            gamemode = 'Creative Mode';
                            break;
                        case '2':
                        case 'adventure':
                            pk.writeFloat(2);
                            gamemode = 'Adventure Mode';
                            break;
                        case '3':
                        case 'spectator':
                            pk.writeFloat(3);
                            gamemode = 'Spectator Mode';
                            break;
                        default: {
                            const message = new ChatMessagePacketC();
                            message.JSONData = new Chat().addText(`Unknown gamemode; ${args[0]}`);
                            message.Position = 1;
                            message.Sender = player.getUUID();
                            return await player.sendPacket(message, PlayClientbound.ChatMessage);
                        }
                    }
                    await player.sendPacket(pk, PlayClientbound.ChangeGameState);
                    const message = new ChatMessagePacketC();
                    message.JSONData = new Chat().translate('commands.gamemode.success.self', [gamemode]);
                    message.Position = 1;
                    message.Sender = player.getUUID();
                    await player.sendPacket(message, PlayClientbound.ChatMessage);
                    break;
                }
                case 'reload': {
                    server.reload();
                    break;
                }
                default: {
                    const message = new ChatMessagePacketC();
                    message.JSONData = new Chat().addText(`Unknown or incomplete command; ${command}`, {
                        color: 'red',
                    });
                    message.Position = 1;
                    message.Sender = player.getUUID();
                    return await player.sendPacket(message, PlayClientbound.ChatMessage);
                }
            }
            return server.getConsole().log(`${player.getName()} has executed the command ${command}`);
        }
        const message = new ChatMessagePacketC();
        message.JSONData = new Chat().translate('chat.type.text', [player.getName(), packet.Message]);
        message.Position = 0;
        message.Sender = player.getUUID();
        await server.getPlayerManager().sendPacketAll(message, PlayClientbound.ChatMessage);
        server.getConsole().log(`<${player.getName()}> ${packet.Message}`);
    }
}
