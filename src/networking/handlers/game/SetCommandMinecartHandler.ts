import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSetCommandMinecartPacket from '../../packets/game/ServerboundSetCommandMinecartPacket';
import type Handler from '../Handler';

export default class SetCommandMinecartHandler implements Handler<ServerboundSetCommandMinecartPacket> {
    public hander(_packet: ServerboundSetCommandMinecartPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
