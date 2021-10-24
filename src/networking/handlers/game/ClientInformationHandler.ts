import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundClientInformationPacket from '../../packets/game/ServerboundClientInformationPacket';
import type Handler from '../Handler';

export default class ClientInformationHandler implements Handler<ServerboundClientInformationPacket> {
    public hander(_packet: ServerboundClientInformationPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
