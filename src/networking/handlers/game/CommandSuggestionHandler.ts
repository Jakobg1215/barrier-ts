import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundCommandSuggestionPacket from '../../packets/game/ServerboundCommandSuggestionPacket';
import type Handler from '../Handler';

export default class CommandSuggestionHandler implements Handler<ServerboundCommandSuggestionPacket> {
    public hander(_packet: ServerboundCommandSuggestionPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
