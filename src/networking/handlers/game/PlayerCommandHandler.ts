import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPlayerCommandPacket from '../../packets/game/ServerboundPlayerCommandPacket';
import type Handler from '../Handler';

export default class PlayerCommandHandler implements Handler<ServerboundPlayerCommandPacket> {
    public hander(_packet: ServerboundPlayerCommandPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
