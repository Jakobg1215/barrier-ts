import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundRecipeBookSeenRecipePacket from '../../packets/game/ServerboundRecipeBookSeenRecipePacket';
import type Handler from '../Handler';

export default class RecipeBookSeenRecipeHandler implements Handler<ServerboundRecipeBookSeenRecipePacket> {
    public hander(_packet: ServerboundRecipeBookSeenRecipePacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
