import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundUseItemOnPacket from '../../packets/game/ServerboundUseItemOnPacket';
import type Handler from '../Handler';

export default class UseItemOnHandler implements Handler<ServerboundUseItemOnPacket> {
    public hander(_packet: ServerboundUseItemOnPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
