import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundResourcePackPacket from '../../packets/game/ServerboundResourcePackPacket';
import type Handler from '../Handler';

export default class ResourcePackHandler implements Handler<ServerboundResourcePackPacket> {
    public hander(_packet: ServerboundResourcePackPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
