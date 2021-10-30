import type BarrierTs from '../../../BarrierTs';
import Chat from '../../../types/classes/Chat';
import type Connection from '../../Connection';
import type ServerboundKeepAlivePacket from '../../packets/game/ServerboundKeepAlivePacket';
import type Handler from '../Handler';

export default class KeepAliveHandler implements Handler<ServerboundKeepAlivePacket> {
    public hander(packet: ServerboundKeepAlivePacket, connection: Connection, _server: BarrierTs): void {
        if (packet.id === connection.keepAliveId.readBigInt64BE()) {
        } else connection.disconnect(new Chat().addTranslate('disconnect.timeout', new Chat()));
    }
}
