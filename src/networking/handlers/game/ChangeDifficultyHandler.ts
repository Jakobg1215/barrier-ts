import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundChangeDifficultyPacket from '../../packets/game/ServerboundChangeDifficultyPacket';
import type Handler from '../Handler';

export default class ChangeDifficultyHandler implements Handler<ServerboundChangeDifficultyPacket> {
    public hander(_packet: ServerboundChangeDifficultyPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
