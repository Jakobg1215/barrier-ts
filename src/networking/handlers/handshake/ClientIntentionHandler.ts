import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ClientIntentionPacket from '../../packets/handshake/ServerboundClientIntentionPacket';
import { ProtocolState } from '../../Protocol';
import type Handler from '../Handler';

export default class ClientIntentionHandler implements Handler<ClientIntentionPacket> {
    public hander(packet: ClientIntentionPacket, connection: Connection, server: BarrierTs): void {
        switch (packet.intention) {
            case ProtocolState.LOGIN: {
                connection.setProtocolState(ProtocolState.LOGIN);
                if (packet.protocolVersion !== server.prorotocolVersion) {
                    if (packet.protocolVersion > server.prorotocolVersion)
                        return connection.disconnect(
                            JSON.stringify({ translate: 'multiplayer.disconnect.outdated_server', with: ['1.17.1'] }),
                        );
                    return connection.disconnect(
                        JSON.stringify({ translate: 'multiplayer.disconnect.outdated_client', with: ['1.17.1'] }),
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
