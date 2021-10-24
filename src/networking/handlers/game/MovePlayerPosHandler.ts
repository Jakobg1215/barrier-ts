import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundMovePlayerPosPacket from '../../packets/game/ServerboundMovePlayerPosPacket';
import type Handler from '../Handler';

export default class MovePlayerPosHandler implements Handler<ServerboundMovePlayerPosPacket> {
    public hander(_packet: ServerboundMovePlayerPosPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
