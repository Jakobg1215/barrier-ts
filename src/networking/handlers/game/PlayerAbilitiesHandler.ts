import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPlayerAbilitiesPacket from '../../packets/game/ServerboundPlayerAbilitiesPacket';
import type Handler from '../Handler';

export default class PlayerAbilitiesHandler implements Handler<ServerboundPlayerAbilitiesPacket> {
    public hander(_packet: ServerboundPlayerAbilitiesPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
