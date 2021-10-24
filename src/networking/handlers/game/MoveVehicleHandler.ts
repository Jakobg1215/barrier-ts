import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundMoveVehiclePacket from '../../packets/game/ServerboundMoveVehiclePacket';
import type Handler from '../Handler';

export default class MoveVehicleHandler implements Handler<ServerboundMoveVehiclePacket> {
    public hander(_packet: ServerboundMoveVehiclePacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
