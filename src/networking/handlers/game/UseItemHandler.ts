import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundUseItemPacket from '../../packets/game/ServerboundUseItemPacket ';
import type Handler from '../Handler';

export default class UseItemHandler implements Handler<ServerboundUseItemPacket> {
    public hander(_packet: ServerboundUseItemPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
