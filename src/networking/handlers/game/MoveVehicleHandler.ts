import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundMoveVehiclePacket from '../../packets/game/ServerboundMoveVehiclePacket';
import type Handler from '../Handler';

export default class MoveVehicleHandler implements Handler<ServerboundMoveVehiclePacket> {
    public hander(_packet: ServerboundMoveVehiclePacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
