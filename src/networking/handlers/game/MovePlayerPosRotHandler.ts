import type BarrierTs from '../../../BarrierTs';
import Vector2 from '../../../types/classes/Vector2';
import Vector3 from '../../../types/classes/Vector3';
import type Connection from '../../Connection';
import ClientboundMoveEntityPosRotPacket from '../../packets/game/ClientboundMoveEntityPosRotPacket';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import type ServerboundMovePlayerPosRotPacket from '../../packets/game/ServerboundMovePlayerPosRotPacket';
import type Handler from '../Handler';

export default class MovePlayerPosRotHandler implements Handler<ServerboundMovePlayerPosRotPacket> {
    public hander(packet: ServerboundMovePlayerPosRotPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundMoveEntityPosRotPacket(
                connection.player?.id!,
                Math.min(Math.max((packet.x * 32 - connection.player?.position.x! * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.y * 32 - connection.player?.position.y! * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.z * 32 - connection.player?.position.z! * 32) * 128, -32768), 32767),
                ((packet.yRot * 256) / 360) & 255,
                ((packet.xRot * 256) / 360) & 255,
                packet.onGround,
            ),
            [connection.player?.id!],
        );
        server.brodcast(new ClientboundRotateHeadPacket(connection.player?.id!, ((packet.yRot * 256) / 360) & 255), [
            connection.player?.id!,
        ]);
        connection.player?.updatePosition(new Vector3(packet.x, packet.y, packet.z));
        connection.player?.updateRotation(new Vector2(packet.xRot, packet.yRot));
    }
}
