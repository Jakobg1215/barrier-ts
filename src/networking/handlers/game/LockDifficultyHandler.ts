import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundLockDifficultyPacket from '../../packets/game/ServerboundLockDifficultyPacket';
import type Handler from '../Handler';

export default class LockDifficultyHandler implements Handler<ServerboundLockDifficultyPacket> {
    public hander(_packet: ServerboundLockDifficultyPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
