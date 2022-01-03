import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundRenameItemPacket from '../../packets/game/ServerboundRenameItemPacket';
import type Handler from '../Handler';

export default class RenameItemHandler implements Handler<ServerboundRenameItemPacket> {
    public hander(_packet: ServerboundRenameItemPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
