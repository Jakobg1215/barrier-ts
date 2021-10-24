import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundContainerButtonClickPacket from '../../packets/game/ServerboundContainerButtonClickPacket';
import type Handler from '../Handler';

export default class ContainerButtonClickHandler implements Handler<ServerboundContainerButtonClickPacket> {
    public hander(_packet: ServerboundContainerButtonClickPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
