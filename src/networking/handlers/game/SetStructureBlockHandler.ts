import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSetStructureBlockPacket from '../../packets/game/ServerboundSetStructureBlockPacket';
import type Handler from '../Handler';

export default class SetStructureBlockHandler implements Handler<ServerboundSetStructureBlockPacket> {
    public hander(_packet: ServerboundSetStructureBlockPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
