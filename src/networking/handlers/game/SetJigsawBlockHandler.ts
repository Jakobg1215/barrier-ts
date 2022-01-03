import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundSetJigsawBlockPacket from '../../packets/game/ServerboundSetJigsawBlockPacket';
import type Handler from '../Handler';

export default class SetJigsawBlockHandler implements Handler<ServerboundSetJigsawBlockPacket> {
    public hander(_packet: ServerboundSetJigsawBlockPacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
