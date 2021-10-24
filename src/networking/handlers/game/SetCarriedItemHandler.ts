import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSetCarriedItemPacket from '../../packets/game/ServerboundSetCarriedItemPacket';
import type Handler from '../Handler';

export default class SetCarriedItemHandler implements Handler<ServerboundSetCarriedItemPacket> {
    public hander(_packet: ServerboundSetCarriedItemPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
