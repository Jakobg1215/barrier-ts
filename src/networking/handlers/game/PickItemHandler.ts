import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPickItemPacket from '../../packets/game/ServerboundPickItemPacket';
import type Handler from '../Handler';

export default class PickItemHandler implements Handler<ServerboundPickItemPacket> {
    public hander(_packet: ServerboundPickItemPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
