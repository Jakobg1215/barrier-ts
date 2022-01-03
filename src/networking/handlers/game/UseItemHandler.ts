import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundUseItemPacket from '../../packets/game/ServerboundUseItemPacket ';
import type Handler from '../Handler';

export default class UseItemHandler implements Handler<ServerboundUseItemPacket> {
    public hander(_packet: ServerboundUseItemPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
