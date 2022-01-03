import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSeenAdvancementsPacket from '../../packets/game/ServerboundSeenAdvancementsPacket';
import type Handler from '../Handler';

export default class SeenAdvancementsHandler implements Handler<ServerboundSeenAdvancementsPacket> {
    public hander(_packet: ServerboundSeenAdvancementsPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
