import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundRecipeBookChangeSettingsPacket from '../../packets/game/ServerboundRecipeBookChangeSettingsPacket';
import type Handler from '../Handler';

export default class RecipeBookChangeSettingsHandler implements Handler<ServerboundRecipeBookChangeSettingsPacket> {
    public hander(_packet: ServerboundRecipeBookChangeSettingsPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
