import type BarrierTs from '../../../BarrierTs';
import Vector2 from '../../../types/classes/Vector2';
import type Connection from '../../Connection';
import ClientboundMoveEntityPacketRot from '../../packets/game/ClientboundMoveEntityPacketRot';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import type ServerboundMovePlayerRotPacket from '../../packets/game/ServerboundMovePlayerRotPacket';
import type Handler from '../Handler';

export default class MovePlayerRotHandler implements Handler<ServerboundMovePlayerRotPacket> {
    public hander(packet: ServerboundMovePlayerRotPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundMoveEntityPacketRot(
                connection.player.id,
                (packet.yRot * 256) / 360,
                (packet.xRot * 256) / 360,
                packet.onGround,
            ),
            [connection.player.id],
        );
        server.brodcast(new ClientboundRotateHeadPacket(connection.player.id, (packet.yRot * 256) / 360), [
            connection.player.id,
        ]);
        connection.player.updateRotation(new Vector2(packet.xRot, packet.yRot));
    }
}
