import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundContainerClickPacket from '../../packets/game/ServerboundContainerClickPacket';
import type Handler from '../Handler';

export default class ContainerClickHandler implements Handler<ServerboundContainerClickPacket> {
    public hander(_packet: ServerboundContainerClickPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
