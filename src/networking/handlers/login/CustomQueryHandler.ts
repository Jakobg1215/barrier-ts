import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundCustomQueryPacket from '../../packets/login/ServerboundCustomQueryPacket';
import type Handler from '../Handler';

export default class CustomQueryHandler implements Handler<ServerboundCustomQueryPacket> {
    public hander(_packet: ServerboundCustomQueryPacket, _connection: Connection, _server: BarrierTs): void {}
}
