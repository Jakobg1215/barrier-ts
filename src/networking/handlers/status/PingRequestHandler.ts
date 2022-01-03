import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundPongResponsePacket from '../../packets/status/ClientboundPongResponsePacket';
import type ServerboundPingRequestPacket from '../../packets/status/ServerboundPingRequestPacket';
import type Handler from '../Handler';

export default class PingRequestHandler implements Handler<ServerboundPingRequestPacket> {
    public hander(_packet: ServerboundPingRequestPacket, player: Player, _server: BarrierTs): void {
        player.connection.send(new ClientboundPongResponsePacket(BigInt(Date.now())));
        player.connection.end();
    }
}
