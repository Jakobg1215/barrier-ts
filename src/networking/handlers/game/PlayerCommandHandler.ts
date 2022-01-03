import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import type ServerboundPlayerCommandPacket from '../../packets/game/ServerboundPlayerCommandPacket';
import { Action } from '../../packets/game/ServerboundPlayerCommandPacket';
import type Handler from '../Handler';

export default class PlayerCommandHandler implements Handler<ServerboundPlayerCommandPacket> {
    public hander(packet: ServerboundPlayerCommandPacket, player: Player, server: BarrierTs): void {
        switch (packet.action) {
            case Action.PRESS_SHIFT_KEY: {
                player.isCrouching = true;
                server.playerManager.sendAll(player.updataMetaData(), player.id);
                break;
            }
            case Action.RELEASE_SHIFT_KEY: {
                player.isCrouching = false;
                server.playerManager.sendAll(player.updataMetaData(), player.id);
                break;
            }
            case Action.START_SPRINTING: {
                player.isSprinting = true;
                server.playerManager.sendAll(player.updataMetaData(), player.id);
                break;
            }
            case Action.STOP_SPRINTING: {
                player.isSprinting = false;
                server.playerManager.sendAll(player.updataMetaData(), player.id);
                break;
            }
            default: {
                throw new Error(`Missing handler for action ${packet.action}`);
            }
        }
    }
}
