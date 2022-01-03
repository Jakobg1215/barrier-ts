import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundContainerButtonClickPacket from '../../packets/game/ServerboundContainerButtonClickPacket';
import type Handler from '../Handler';

export default class ContainerButtonClickHandler implements Handler<ServerboundContainerButtonClickPacket> {
    public hander(_packet: ServerboundContainerButtonClickPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
