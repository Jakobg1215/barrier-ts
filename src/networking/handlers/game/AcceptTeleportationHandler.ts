import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundAcceptTeleportationPacket from '../../packets/game/ServerboundAcceptTeleportationPacket';
import type Handler from '../Handler';

export default class AcceptTeleportationHandler implements Handler<ServerboundAcceptTeleportationPacket> {
    public hander(_packet: ServerboundAcceptTeleportationPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
