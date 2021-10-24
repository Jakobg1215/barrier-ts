import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPlayerActionPacket from '../../packets/game/ServerboundPlayerActionPacket';
import type Handler from '../Handler';

export default class PlayerActionHandler implements Handler<ServerboundPlayerActionPacket> {
    public hander(_packet: ServerboundPlayerActionPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
