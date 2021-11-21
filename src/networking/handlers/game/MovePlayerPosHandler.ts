import type BarrierTs from '../../../BarrierTs';
import Vector3 from '../../../types/classes/Vector3';
import type Connection from '../../Connection';
import ClientboundMoveEntityPacketPos from '../../packets/game/ClientboundMoveEntityPacketPos';
import type ServerboundMovePlayerPosPacket from '../../packets/game/ServerboundMovePlayerPosPacket';
import type Handler from '../Handler';

export default class MovePlayerPosHandler implements Handler<ServerboundMovePlayerPosPacket> {
    public hander(packet: ServerboundMovePlayerPosPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundMoveEntityPacketPos(
                connection.player.id,
                Math.min(Math.max((packet.x * 32 - connection.player.position.x * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.y * 32 - connection.player.position.y * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.z * 32 - connection.player.position.z * 32) * 128, -32768), 32767),
                packet.onGround,
            ),
            [connection.player.id],
        );
        connection.player.updatePosition(new Vector3(packet.x, packet.y, packet.z));
    }
}
