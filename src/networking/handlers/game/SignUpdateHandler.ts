import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSignUpdatePacket from '../../packets/game/ServerboundSignUpdatePacket';
import type Handler from '../Handler';

export default class SignUpdateHandler implements Handler<ServerboundSignUpdatePacket> {
    public hander(_packet: ServerboundSignUpdatePacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
