import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundClientCommandPacket from '../../packets/game/ServerboundClientCommandPacket';
import type Handler from '../Handler';

export default class ClientCommandHandler implements Handler<ServerboundClientCommandPacket> {
    public hander(_packet: ServerboundClientCommandPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
