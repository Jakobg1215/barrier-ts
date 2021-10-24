import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSetCommandBlockPacket from '../../packets/game/ServerboundSetCommandBlockPacket';
import type Handler from '../Handler';

export default class SetCommandBlockHandler implements Handler<ServerboundSetCommandBlockPacket> {
    public hander(_packet: ServerboundSetCommandBlockPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
