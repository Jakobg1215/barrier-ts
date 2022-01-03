import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Player from '../../../world/entity/Player/Player';
import ClientboundChatPacket from '../../packets/game/ClientboundChatPacket';
import type ServerboundChatPacket from '../../packets/game/ServerboundChatPacket';
import type Handler from '../Handler';

export default class ChatHandler implements Handler<ServerboundChatPacket> {
    public hander(packet: ServerboundChatPacket, player: Player, server: BarrierTs): void {
        server.playerManager.sendAll(
            new ClientboundChatPacket(
                new Chat().addTranslate(
                    'chat.type.text',
                    new Chat().addText(player.playerGameProfile.name).addText(packet.message),
                ),
                0,
                player.playerGameProfile.uuid,
            ),
        );
    }
}
