import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPlayerInputPacket from '../../packets/game/ServerboundPlayerInputPacket';
import type Handler from '../Handler';

export default class PlayerInputHandler implements Handler<ServerboundPlayerInputPacket> {
    public hander(_packet: ServerboundPlayerInputPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
