import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundPongResponsePacket from '../../packets/status/ClientboundPongResponsePacket';
import type ServerboundPingRequestPacket from '../../packets/status/ServerboundPingRequestPacket';
import type Handler from '../Handler';

export default class PingRequestHandler implements Handler<ServerboundPingRequestPacket> {
    public hander(_packet: ServerboundPingRequestPacket, connection: Connection, _server: BarrierTs): void {
        connection.send(new ClientboundPongResponsePacket(BigInt(Date.now())));
        connection.networking.end();
    }
}
