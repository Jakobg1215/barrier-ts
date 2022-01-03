import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundKeepAlivePacket from '../../packets/game/ServerboundKeepAlivePacket';
import type Handler from '../Handler';

export default class KeepAliveHandler implements Handler<ServerboundKeepAlivePacket> {
    public hander(packet: ServerboundKeepAlivePacket, player: Player, server: BarrierTs): void {
        if (packet.id === server.playerManager.keepAliveId.readBigInt64BE()) {
        } else player.connection.disconnect(new Chat().addTranslate('disconnect.timeout', new Chat()));
    }
}
