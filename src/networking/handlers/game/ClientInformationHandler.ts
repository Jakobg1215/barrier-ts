import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundSetEntityDataPacket from '../../packets/game/ClientboundSetEntityDataPacket';
import type ServerboundClientInformationPacket from '../../packets/game/ServerboundClientInformationPacket';
import type Handler from '../Handler';

export default class ClientInformationHandler implements Handler<ServerboundClientInformationPacket> {
    public hander(packet: ServerboundClientInformationPacket, connection: Connection, server: BarrierTs): void {
        if (packet.modelCustomisation !== connection.player.gameProfile.skinCustomization) {
            connection.player.gameProfile.skinCustomization = packet.modelCustomisation;
            server.brodcast(
                new ClientboundSetEntityDataPacket(connection.player.id, [
                    { index: 17, type: 0, value: packet.modelCustomisation },
                ]),
            );
        }
    }
}
