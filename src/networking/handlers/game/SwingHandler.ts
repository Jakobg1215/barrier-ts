import type BarrierTs from '../../../BarrierTs';
import { InteractionHand } from '../../../types/enums/InteractionHand';
import type Connection from '../../Connection';
import ClientboundAnimatePacket from '../../packets/game/ClientboundAnimatePacket';
import type ServerboundSwingPacket from '../../packets/game/ServerboundSwingPacket';
import type Handler from '../Handler';

export default class SwingHandler implements Handler<ServerboundSwingPacket> {
    public hander(packet: ServerboundSwingPacket, connection: Connection, server: BarrierTs): void {
        if (packet.hand === InteractionHand.MAIN_HAND) {
            return server.brodcast(new ClientboundAnimatePacket(connection.player.id, 0), [connection.player.id]);
        }
        server.brodcast(new ClientboundAnimatePacket(connection.player.id, 3), [connection.player.id]);
    }
}
