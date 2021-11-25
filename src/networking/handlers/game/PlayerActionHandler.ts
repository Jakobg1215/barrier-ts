import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundBlockUpdatePacket from '../../packets/game/ClientboundBlockUpdatePacket';
import type ServerboundPlayerActionPacket from '../../packets/game/ServerboundPlayerActionPacket';
import { Action } from '../../packets/game/ServerboundPlayerActionPacket';
import type Handler from '../Handler';

export default class PlayerActionHandler implements Handler<ServerboundPlayerActionPacket> {
    public hander(packet: ServerboundPlayerActionPacket, _connection: Connection, server: BarrierTs): void {
        switch (packet.action) {
            case Action.START_DESTROY_BLOCK: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.pos, 0));
            }
        }
    }
}
