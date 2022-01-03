import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSetBeaconPacket from '../../packets/game/ServerboundSetBeaconPacket';
import type Handler from '../Handler';

export default class SetBeaconHandler implements Handler<ServerboundSetBeaconPacket> {
    public hander(_packet: ServerboundSetBeaconPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
