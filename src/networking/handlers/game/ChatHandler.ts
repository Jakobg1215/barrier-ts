import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundChatPacket from '../../packets/game/ClientboundChatPacket';
import type ServerboundChatPacket from '../../packets/game/ServerboundChatPacket';
import type Handler from '../Handler';

export default class ChatHandler implements Handler<ServerboundChatPacket> {
    public hander(packet: ServerboundChatPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundChatPacket(
                JSON.stringify({
                    translate: 'chat.type.text',
                    with: [
                        {
                            text: connection.player?.gameProfile.name,
                            clickEvent: {
                                action: 'suggest_command',
                                value: `/msg ${connection.player?.gameProfile.name} `,
                            },
                            hoverEvent: {
                                action: 'show_entity',
                                value: `{id:${connection.player?.gameProfile.uuid},name:${connection.player?.gameProfile.name}}`,
                            },
                            insertion: connection.player?.gameProfile.name,
                        },
                        { text: packet.message },
                    ],
                }),
                0,
                connection.player?.gameProfile.uuid!,
            ),
        );
    }
}
