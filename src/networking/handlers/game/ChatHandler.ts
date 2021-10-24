import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundChatPacket from '../../packets/game/ServerboundChatPacket';
import type Handler from '../Handler';

export default class ChatHandler implements Handler<ServerboundChatPacket> {
    public hander(_packet: ServerboundChatPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
