import type BarrierTs from '../../../BarrierTs';
import { Direction } from '../../../types/enums/Direction';
import type Connection from '../../Connection';
import ClientboundBlockUpdatePacket from '../../packets/game/ClientboundBlockUpdatePacket';
import type ServerboundUseItemOnPacket from '../../packets/game/ServerboundUseItemOnPacket';
import type Handler from '../Handler';

export default class UseItemOnHandler implements Handler<ServerboundUseItemOnPacket> {
    public hander(packet: ServerboundUseItemOnPacket, _connection: Connection, server: BarrierTs): void {
        switch (packet.direction) {
            case Direction.DOWN: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setY(packet.blockPos.y - 1), 1));
                break;
            }
            case Direction.EAST: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setX(packet.blockPos.x + 1), 1));
                break;
            }
            case Direction.NORTH: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setZ(packet.blockPos.z - 1), 1));
                break;
            }
            case Direction.SOUTH: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setZ(packet.blockPos.z + 1), 1));
                break;
            }
            case Direction.UP: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setY(packet.blockPos.y + 1), 1));
                break;
            }
            case Direction.WEST: {
                server.brodcast(new ClientboundBlockUpdatePacket(packet.blockPos.setX(packet.blockPos.x - 1), 1));
                break;
            }
        }
    }
}
