import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSetJigsawBlockPacket from '../../packets/game/ServerboundSetJigsawBlockPacket';
import type Handler from '../Handler';

export default class SetJigsawBlockHandler implements Handler<ServerboundSetJigsawBlockPacket> {
    public hander(_packet: ServerboundSetJigsawBlockPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
