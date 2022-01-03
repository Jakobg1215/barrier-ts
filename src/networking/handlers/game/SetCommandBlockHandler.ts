import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSetCommandBlockPacket from '../../packets/game/ServerboundSetCommandBlockPacket';
import type Handler from '../Handler';

export default class SetCommandBlockHandler implements Handler<ServerboundSetCommandBlockPacket> {
    public hander(_packet: ServerboundSetCommandBlockPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
