import type BarrierTs from '../../../BarrierTs';
import { Hand } from '../../../types/enums/Hand';
import type Player from '../../../world/entity/Player/Player';
import ClientboundAnimatePacket from '../../packets/game/ClientboundAnimatePacket';
import type ServerboundSwingPacket from '../../packets/game/ServerboundSwingPacket';
import type Handler from '../Handler';

export default class SwingHandler implements Handler<ServerboundSwingPacket> {
    public hander(packet: ServerboundSwingPacket, player: Player, server: BarrierTs): void {
        if (packet.hand === Hand.MAIN_HAND) {
            return server.playerManager.sendAll(new ClientboundAnimatePacket(player.id, 0), player.id);
        }
        server.playerManager.sendAll(new ClientboundAnimatePacket(player.id, 3), player.id);
    }
}
