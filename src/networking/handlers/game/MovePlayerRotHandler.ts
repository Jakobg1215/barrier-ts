import type BarrierTs from '../../../BarrierTs';
import Vector2 from '../../../types/classes/Vector2';
import type Connection from '../../Connection';
import ClientboundMoveEntityRotPacket from '../../packets/game/ClientboundMoveEntityRotPacket';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import type ServerboundMovePlayerRotPacket from '../../packets/game/ServerboundMovePlayerRotPacket';
import type Handler from '../Handler';

export default class MovePlayerRotHandler implements Handler<ServerboundMovePlayerRotPacket> {
    public hander(packet: ServerboundMovePlayerRotPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundMoveEntityRotPacket(
                connection.player?.id!,
                ((packet.yRot * 256) / 360) & 255,
                ((packet.xRot * 256) / 360) & 255,
                packet.onGround,
            ),
            [connection.player?.id!],
        );
        server.brodcast(new ClientboundRotateHeadPacket(connection.player?.id!, ((packet.yRot * 256) / 360) & 255), [
            connection.player?.id!,
        ]);
        connection.player?.updateRotation(new Vector2(packet.xRot, packet.yRot));
    }
}
