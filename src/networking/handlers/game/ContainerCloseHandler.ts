import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundContainerClosePacket from '../../packets/game/ServerboundContainerClosePacket';
import type Handler from '../Handler';

export default class ContainerCloseHandler implements Handler<ServerboundContainerClosePacket> {
    public hander(_packet: ServerboundContainerClosePacket, _player: Player, _server: BarrierTs): void {
        // This can be an event for later
    }
}
