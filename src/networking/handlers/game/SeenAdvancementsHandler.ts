import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSeenAdvancementsPacket from '../../packets/game/ServerboundSeenAdvancementsPacket';
import type Handler from '../Handler';

export default class SeenAdvancementsHandler implements Handler<ServerboundSeenAdvancementsPacket> {
    public hander(_packet: ServerboundSeenAdvancementsPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
