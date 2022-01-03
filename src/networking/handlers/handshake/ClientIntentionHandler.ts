import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Player from '../../../world/entity/Player/Player';
import type ClientIntentionPacket from '../../packets/handshake/ServerboundClientIntentionPacket';
import { ProtocolState } from '../../Protocol';
import type Handler from '../Handler';

export default class ClientIntentionHandler implements Handler<ClientIntentionPacket> {
    public hander(packet: ClientIntentionPacket, player: Player, server: BarrierTs): void {
        switch (packet.intention) {
            case ProtocolState.LOGIN: {
                player.connection.protocolState = ProtocolState.LOGIN;
                if (packet.protocolVersion !== server.minecraftVersion.protocol) {
                    if (packet.protocolVersion > server.minecraftVersion.protocol) {
                        return player.connection.disconnect(
                            new Chat().addTranslate(
                                'multiplayer.disconnect.outdated_server',
                                new Chat().addText(server.minecraftVersion.version),
                            ),
                        );
                    }
                    return player.connection.disconnect(
                        new Chat().addTranslate(
                            'multiplayer.disconnect.outdated_client',
                            new Chat().addText(server.minecraftVersion.version),
                        ),
                    );
                }
                break;
            }

            case ProtocolState.STATUS: {
                player.connection.protocolState = ProtocolState.STATUS;
                break;
            }

            default: {
                server.console.error('Client had an invalid intention!');
                player.connection.end();
            }
        }
    }
}
