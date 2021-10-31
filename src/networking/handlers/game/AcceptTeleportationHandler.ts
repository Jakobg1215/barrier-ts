import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Connection from '../../Connection';
import type ServerboundAcceptTeleportationPacket from '../../packets/game/ServerboundAcceptTeleportationPacket';
import type Handler from '../Handler';

export default class AcceptTeleportationHandler implements Handler<ServerboundAcceptTeleportationPacket> {
    public hander(packet: ServerboundAcceptTeleportationPacket, connection: Connection, _server: BarrierTs): void {
        if (packet.id === connection.teleportId.readInt32BE()) {
        } else connection.disconnect(new Chat().addTranslate('disconnect.timeout', new Chat()));
    }
}
