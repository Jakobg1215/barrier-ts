import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundEntityTagQueryPacket from '../../packets/game/ServerboundEntityTagQueryPacket';
import type Handler from '../Handler';

export default class EntityTagQueryHandler implements Handler<ServerboundEntityTagQueryPacket> {
    public hander(_packet: ServerboundEntityTagQueryPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
