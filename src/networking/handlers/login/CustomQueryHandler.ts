import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundCustomQueryPacket from '../../packets/login/ServerboundCustomQueryPacket';
import type Handler from '../Handler';

export default class CustomQueryHandler implements Handler<ServerboundCustomQueryPacket> {
    public hander(_packet: ServerboundCustomQueryPacket, _player: Player, _server: BarrierTs): void {}
}
