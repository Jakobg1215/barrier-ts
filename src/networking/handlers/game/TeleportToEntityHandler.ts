import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundTeleportToEntityPacket from '../../packets/game/ServerboundTeleportToEntityPacket';
import type Handler from '../Handler';

export default class TeleportToEntityHandler implements Handler<ServerboundTeleportToEntityPacket> {
    public hander(_packet: ServerboundTeleportToEntityPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
