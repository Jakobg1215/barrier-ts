import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundJigsawGeneratePacket from '../../packets/game/ServerboundJigsawGeneratePacket';
import type Handler from '../Handler';

export default class JigsawGenerateHandler implements Handler<ServerboundJigsawGeneratePacket> {
    public hander(_packet: ServerboundJigsawGeneratePacket, _player: Player, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
