import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundEditBookPacket from '../../packets/game/ServerboundEditBookPacket';
import type Handler from '../Handler';

export default class EditBookHandler implements Handler<ServerboundEditBookPacket> {
    public hander(_packet: ServerboundEditBookPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
