import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPongPacket from '../../packets/game/ServerboundPongPacket';
import type Handler from '../Handler';

export default class PongHandler implements Handler<ServerboundPongPacket> {
    public hander(_packet: ServerboundPongPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
