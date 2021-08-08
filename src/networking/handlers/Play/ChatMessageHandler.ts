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
                            message.JSONData = new Chat().addText(`Unknown gamemode; ${args[0]}`, { color: 'red' });
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
                case 'commands': {
                    const DeclareCommands = new Packet();
                    DeclareCommands.writeVarInt(9);
                    // root
                    DeclareCommands.writeByte(0);
                    DeclareCommands.writeVarInt(3);
                    DeclareCommands.writeVarInt(1);
                    DeclareCommands.writeVarInt(2);
                    DeclareCommands.writeVarInt(3);
                    // op command
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('op');
                    // gamemode command
                    DeclareCommands.writeByte(1);
                    DeclareCommands.writeVarInt(5);
                    DeclareCommands.writeVarInt(4);
                    DeclareCommands.writeVarInt(5);
                    DeclareCommands.writeVarInt(6);
                    DeclareCommands.writeVarInt(7);
                    DeclareCommands.writeVarInt(8);
                    DeclareCommands.writeString('gamemode');
                    // reload command
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('reload');
                    // gamemode arguments
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('survival');
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('creative');
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('adventure');
                    DeclareCommands.writeByte(5);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('spectator');
                    DeclareCommands.writeByte(6);
                    DeclareCommands.writeVarInt(0);
                    DeclareCommands.writeString('gamenum');
                    DeclareCommands.writeString('brigadier:integer');
                    DeclareCommands.writeByte(3);
                    DeclareCommands.writeInt(0);
                    DeclareCommands.writeInt(3);
                    DeclareCommands.writeVarInt(0);
                    await player.sendPacket(DeclareCommands, PlayClientbound.DeclareCommands);
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
