import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPlayerInputPacket from '../../packets/game/ServerboundPlayerInputPacket';
import type Handler from '../Handler';

export default class PlayerInputHandler implements Handler<ServerboundPlayerInputPacket> {
    public hander(_packet: ServerboundPlayerInputPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
