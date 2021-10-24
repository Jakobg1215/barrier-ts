import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import type ServerboundSetCommandMinecartPacket from '../../packets/game/ServerboundSetCommandMinecartPacket';
import type Handler from '../Handler';

export default class SetCommandMinecartHandler implements Handler<ServerboundSetCommandMinecartPacket> {
    public hander(_packet: ServerboundSetCommandMinecartPacket, _connection: Connection, _server: BarrierTs): void {
        throw new Error('Method not implemented.');
    }
}
