import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundChangeDifficultyPacket from '../../packets/game/ServerboundChangeDifficultyPacket';
import type Handler from '../Handler';

export default class ChangeDifficultyHandler implements Handler<ServerboundChangeDifficultyPacket> {
    public hander(_packet: ServerboundChangeDifficultyPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
