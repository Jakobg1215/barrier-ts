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
                    if (packet.protocolVersion < 754) return connection.disconnect();
                    return connection.disconnect();
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
            }
        }
    }
}
