import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSignUpdatePacket from '../../packets/game/ServerboundSignUpdatePacket';
import type Handler from '../Handler';

export default class SignUpdateHandler implements Handler<ServerboundSignUpdatePacket> {
    public hander(_packet: ServerboundSignUpdatePacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
