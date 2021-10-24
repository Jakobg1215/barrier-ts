import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSetCreativeModeSlotPacket from '../../packets/game/ServerboundSetCreativeModeSlotPacket';
import type Handler from '../Handler';

export default class SetCreativeModeSlotHandler implements Handler<ServerboundSetCreativeModeSlotPacket> {
    public hander(_packet: ServerboundSetCreativeModeSlotPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
