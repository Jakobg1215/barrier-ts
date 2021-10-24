import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPickItemPacket from '../../packets/game/ServerboundPickItemPacket';
import type Handler from '../Handler';

export default class PickItemHandler implements Handler<ServerboundPickItemPacket> {
    public hander(_packet: ServerboundPickItemPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
