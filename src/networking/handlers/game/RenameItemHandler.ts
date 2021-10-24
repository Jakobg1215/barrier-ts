import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundRenameItemPacket from '../../packets/game/ServerboundRenameItemPacket';
import type Handler from '../Handler';

export default class RenameItemHandler implements Handler<ServerboundRenameItemPacket> {
    public hander(_packet: ServerboundRenameItemPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
