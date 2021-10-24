import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundBlockEntityTagQueryPacket from '../../packets/game/ServerboundBlockEntityTagQueryPacket';
import type Handler from '../Handler';

export default class BlockEntityTagQueryHandler implements Handler<ServerboundBlockEntityTagQueryPacket> {
    public hander(_packet: ServerboundBlockEntityTagQueryPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
