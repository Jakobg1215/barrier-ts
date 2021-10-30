import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Connection from '../../Connection';
import type ClientIntentionPacket from '../../packets/handshake/ServerboundClientIntentionPacket';
import { ProtocolState } from '../../Protocol';
import type Handler from '../Handler';

export default class ClientIntentionHandler implements Handler<ClientIntentionPacket> {
    public hander(packet: ClientIntentionPacket, connection: Connection, server: BarrierTs): void {
        switch (packet.intention) {
            case ProtocolState.LOGIN: {
                connection.setProtocolState(ProtocolState.LOGIN);
                if (packet.protocolVersion !== server.minecraftVersion.protocol) {
                    if (packet.protocolVersion > server.minecraftVersion.protocol) {
                        return connection.disconnect(
                            new Chat().addTranslate(
                                'multiplayer.disconnect.outdated_server',
                                new Chat().addText(server.minecraftVersion.version),
                            ),
                        );
                    }
                    return connection.disconnect(
                        new Chat().addTranslate(
                            'multiplayer.disconnect.outdated_client',
                            new Chat().addText(server.minecraftVersion.version),
                        ),
                    );
                }
                break;
            }

            case ProtocolState.STATUS: {
                connection.setProtocolState(ProtocolState.STATUS);
                break;
            }

            default: {
                server.console.error('Client had an invalid intention!');
                server.console.debug('Disconnecting Client');
                connection.end();
            }
        }
    }
}
