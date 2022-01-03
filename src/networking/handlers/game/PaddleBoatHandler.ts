import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPaddleBoatPacket from '../../packets/game/ServerboundPaddleBoatPacket';
import type Handler from '../Handler';

export default class PaddleBoatHandler implements Handler<ServerboundPaddleBoatPacket> {
    public hander(_packet: ServerboundPaddleBoatPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
