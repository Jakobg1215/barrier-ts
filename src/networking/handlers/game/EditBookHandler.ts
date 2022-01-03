import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundEditBookPacket from '../../packets/game/ServerboundEditBookPacket';
import type Handler from '../Handler';

export default class EditBookHandler implements Handler<ServerboundEditBookPacket> {
    public hander(_packet: ServerboundEditBookPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
