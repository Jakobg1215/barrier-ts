import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundSetEntityDataPacket from '../../packets/game/ClientboundSetEntityDataPacket';
import type ServerboundPlayerCommandPacket from '../../packets/game/ServerboundPlayerCommandPacket';
import { Action } from '../../packets/game/ServerboundPlayerCommandPacket';
import type Handler from '../Handler';

export default class PlayerCommandHandler implements Handler<ServerboundPlayerCommandPacket> {
    public hander(packet: ServerboundPlayerCommandPacket, connection: Connection, server: BarrierTs): void {
        switch (packet.action) {
            case Action.PRESS_SHIFT_KEY: {
                server.brodcast(
                    new ClientboundSetEntityDataPacket(connection.player.id, [{ index: 0, type: 0, value: 2 }]),
                    [connection.player.id],
                );
                break;
            }
            case Action.RELEASE_SHIFT_KEY: {
                server.brodcast(
                    new ClientboundSetEntityDataPacket(connection.player.id, [{ index: 0, type: 0, value: 0 }]),
                    [connection.player.id],
                );
                break;
            }
            case Action.START_SPRINTING: {
                server.brodcast(
                    new ClientboundSetEntityDataPacket(connection.player.id, [{ index: 0, type: 0, value: 8 }]),
                    [connection.player.id],
                );
                break;
            }
            case Action.STOP_SPRINTING: {
                server.brodcast(
                    new ClientboundSetEntityDataPacket(connection.player.id, [{ index: 0, type: 0, value: 8 }]),
                    [connection.player.id],
                );
                break;
            }
            default: {
                throw new Error(`Missing handler for action ${packet.action}`);
            }
        }
    }
}
