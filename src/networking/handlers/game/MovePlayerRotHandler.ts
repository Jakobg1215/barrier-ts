import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundMovePlayerRotPacket from '../../packets/game/ServerboundMovePlayerRotPacket';
import type Handler from '../Handler';

export default class MovePlayerRotHandler implements Handler<ServerboundMovePlayerRotPacket> {
    public hander(_packet: ServerboundMovePlayerRotPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
