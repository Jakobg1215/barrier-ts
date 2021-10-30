import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Connection from '../../Connection';
import ClientboundChatPacket from '../../packets/game/ClientboundChatPacket';
import type ServerboundChatPacket from '../../packets/game/ServerboundChatPacket';
import type Handler from '../Handler';

export default class ChatHandler implements Handler<ServerboundChatPacket> {
    public hander(packet: ServerboundChatPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundChatPacket(
                new Chat().addTranslate(
                    'chat.type.text',
                    new Chat().addText(connection.player?.gameProfile.name!).addText(packet.message),
                ),
                0,
                connection.player?.gameProfile.uuid!,
            ),
        );
    }
}
