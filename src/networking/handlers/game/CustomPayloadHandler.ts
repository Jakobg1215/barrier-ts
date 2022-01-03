import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundCustomPayloadPacket from '../../packets/game/ServerboundCustomPayloadPacket';
import type Handler from '../Handler';

export default class CustomPayloadHandler implements Handler<ServerboundCustomPayloadPacket> {
    public hander(_packet: ServerboundCustomPayloadPacket, _player: Player, _server: BarrierTs): void {
        // The vanilla server does nothing
    }
}
