import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundInteractPacket from '../../packets/game/ServerboundInteractPacket';
import type Handler from '../Handler';

export default class InteractHandler implements Handler<ServerboundInteractPacket> {
    public hander(_packet: ServerboundInteractPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
