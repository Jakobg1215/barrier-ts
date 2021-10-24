import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundCustomPayloadPacket from '../../packets/game/ServerboundCustomPayloadPacket';
import type Handler from '../Handler';

export default class CustomPayloadHandler implements Handler<ServerboundCustomPayloadPacket> {
    public hander(_packet: ServerboundCustomPayloadPacket, _connection: Connection, _server: BarrierTs): void {
        // The vanilla server does nothing
    }
}
