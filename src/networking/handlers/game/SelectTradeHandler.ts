import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSelectTradePacket from '../../packets/game/ServerboundSelectTradePacket';
import type Handler from '../Handler';

export default class SelectTradehandler implements Handler<ServerboundSelectTradePacket> {
    public hander(_packet: ServerboundSelectTradePacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
