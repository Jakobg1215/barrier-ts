import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSwingPacket from '../../packets/game/ServerboundSwingPacket';
import type Handler from '../Handler';

export default class SwingHandler implements Handler<ServerboundSwingPacket> {
    public hander(_packet: ServerboundSwingPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
