import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundContainerClickPacket from '../../packets/game/ServerboundContainerClickPacket';
import type Handler from '../Handler';

export default class ContainerClickHandler implements Handler<ServerboundContainerClickPacket> {
    public hander(_packet: ServerboundContainerClickPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
