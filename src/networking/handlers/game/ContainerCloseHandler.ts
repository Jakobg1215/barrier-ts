import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundContainerClosePacket from '../../packets/game/ServerboundContainerClosePacket';
import type Handler from '../Handler';

export default class ContainerCloseHandler implements Handler<ServerboundContainerClosePacket> {
    public hander(_packet: ServerboundContainerClosePacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
