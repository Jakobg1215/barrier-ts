import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPaddleBoatPacket from '../../packets/game/ServerboundPaddleBoatPacket';
import type Handler from '../Handler';

export default class PaddleBoatHandler implements Handler<ServerboundPaddleBoatPacket> {
    public hander(_packet: ServerboundPaddleBoatPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
