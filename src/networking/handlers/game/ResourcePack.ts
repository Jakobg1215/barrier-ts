import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundResourcePackPacket from '../../packets/game/ServerboundResourcePackPacket';
import type Handler from '../Handler';

export default class ResourcePackHandler implements Handler<ServerboundResourcePackPacket> {
    public hander(_packet: ServerboundResourcePackPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
