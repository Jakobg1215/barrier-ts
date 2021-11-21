import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundPlayerAbilitiesPacket from '../../packets/game/ServerboundPlayerAbilitiesPacket';
import type Handler from '../Handler';

export default class PlayerAbilitiesHandler implements Handler<ServerboundPlayerAbilitiesPacket> {
    public hander(packet: ServerboundPlayerAbilitiesPacket, connection: Connection, _server: BarrierTs): void {
        connection.player.isFlying = packet.isFlying;
    }
}
