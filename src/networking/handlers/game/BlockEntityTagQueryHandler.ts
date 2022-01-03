import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundBlockEntityTagQueryPacket from '../../packets/game/ServerboundBlockEntityTagQueryPacket';
import type Handler from '../Handler';

export default class BlockEntityTagQueryHandler implements Handler<ServerboundBlockEntityTagQueryPacket> {
    public hander(_packet: ServerboundBlockEntityTagQueryPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
