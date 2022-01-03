import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPlaceRecipePacket from '../../packets/game/ServerboundPlaceRecipePacket';
import type Handler from '../Handler';

export default class PlaceRecipeHandler implements Handler<ServerboundPlaceRecipePacket> {
    public hander(_packet: ServerboundPlaceRecipePacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
