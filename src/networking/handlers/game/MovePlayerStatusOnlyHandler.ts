import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import ClientboundTeleportEntityPacket from '../../packets/game/ClientboundTeleportEntityPacket';
import type ServerboundMovePlayerStatusOnlyPacket from '../../packets/game/ServerboundMovePlayerStatusOnlyPacket';
import type Handler from '../Handler';

export default class MovePlayerStatusOnlyHandler implements Handler<ServerboundMovePlayerStatusOnlyPacket> {
    public hander(packet: ServerboundMovePlayerStatusOnlyPacket, connection: Connection, server: BarrierTs): void {
        server.brodcast(
            new ClientboundTeleportEntityPacket(
                connection.player?.id!,
                connection.player?.position.x!,
                connection.player?.position.y!,
                connection.player?.position.z!,
                ((connection.player?.rotation.y! * 256) / 360) & 255,
                ((connection.player?.rotation.x! * 256) / 360) & 255,
                packet.onGround,
            ),
            [connection.player?.id!],
        );
        server.brodcast(
            new ClientboundRotateHeadPacket(
                connection.player?.id!,
                ((connection.player?.rotation.y! * 256) / 360) & 255,
            ),
            [connection.player?.id!],
        );
    }
}
