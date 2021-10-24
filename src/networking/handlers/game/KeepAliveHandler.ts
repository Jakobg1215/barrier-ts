import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundKeepAlivePacket from '../../packets/game/ServerboundKeepAlivePacket';
import type Handler from '../Handler';

export default class KeepAliveHandler implements Handler<ServerboundKeepAlivePacket> {
    public hander(_packet: ServerboundKeepAlivePacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
