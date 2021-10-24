import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundMovePlayerPosRotPacket from '../../packets/game/ServerboundMovePlayerPosRotPacket';
import type Handler from '../Handler';

export default class MovePlayerPosRotHandler implements Handler<ServerboundMovePlayerPosRotPacket> {
    public hander(_packet: ServerboundMovePlayerPosRotPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
