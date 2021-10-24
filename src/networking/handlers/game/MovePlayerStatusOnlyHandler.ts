import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundMovePlayerStatusOnlyPacket from '../../packets/game/ServerboundMovePlayerStatusOnlyPacket';
import type Handler from '../Handler';

export default class MovePlayerStatusOnlyHandler implements Handler<ServerboundMovePlayerStatusOnlyPacket> {
    public hander(_packet: ServerboundMovePlayerStatusOnlyPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
