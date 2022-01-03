import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPlayerAbilitiesPacket from '../../packets/game/ServerboundPlayerAbilitiesPacket';
import type Handler from '../Handler';

export default class PlayerAbilitiesHandler implements Handler<ServerboundPlayerAbilitiesPacket> {
    public hander(packet: ServerboundPlayerAbilitiesPacket, player: Player, _server: BarrierTs): void {
        player.isFlying = packet.isFlying;
    }
}
