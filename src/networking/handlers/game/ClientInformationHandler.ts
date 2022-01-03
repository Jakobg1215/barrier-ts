import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundClientInformationPacket from '../../packets/game/ServerboundClientInformationPacket';
import type Handler from '../Handler';

export default class ClientInformationHandler implements Handler<ServerboundClientInformationPacket> {
    public hander(packet: ServerboundClientInformationPacket, player: Player, server: BarrierTs): void {
        if (packet.modelCustomisation !== player.customisation) {
            player.customisation = packet.modelCustomisation;
            server.playerManager.sendAll(player.updataMetaData());
        }

        if (packet.mainHand !== player.mainHand) {
            player.mainHand = packet.mainHand;
            server.playerManager.sendAll(player.updataMetaData());
        }
    }
}
