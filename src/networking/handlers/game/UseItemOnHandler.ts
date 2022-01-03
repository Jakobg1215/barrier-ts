import type BarrierTs from '../../../BarrierTs';
import { Direction } from '../../../types/enums/Direction';
import type Player from '../../../world/entity/Player/Player';
import ClientboundBlockUpdatePacket from '../../packets/game/ClientboundBlockUpdatePacket';
import type ServerboundUseItemOnPacket from '../../packets/game/ServerboundUseItemOnPacket';
import type Handler from '../Handler';

export default class UseItemOnHandler implements Handler<ServerboundUseItemOnPacket> {
    public hander(packet: ServerboundUseItemOnPacket, _player: Player, server: BarrierTs): void {
        switch (packet.direction) {
            case Direction.DOWN: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setY(packet.blockPos.y - 1), 1),
                );
                break;
            }

            case Direction.EAST: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setX(packet.blockPos.x + 1), 1),
                );
                break;
            }

            case Direction.NORTH: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setZ(packet.blockPos.z - 1), 1),
                );
                break;
            }

            case Direction.SOUTH: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setZ(packet.blockPos.z + 1), 1),
                );
                break;
            }

            case Direction.UP: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setY(packet.blockPos.y + 1), 1),
                );
                break;
            }

            case Direction.WEST: {
                server.playerManager.sendAll(
                    new ClientboundBlockUpdatePacket(packet.blockPos.setX(packet.blockPos.x - 1), 1),
                );
                break;
            }
        }
    }
}
