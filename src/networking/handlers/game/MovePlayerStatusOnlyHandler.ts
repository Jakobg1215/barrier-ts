import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import ClientboundTeleportEntityPacket from '../../packets/game/ClientboundTeleportEntityPacket';
import type ServerboundMovePlayerStatusOnlyPacket from '../../packets/game/ServerboundMovePlayerStatusOnlyPacket';
import type Handler from '../Handler';

export default class MovePlayerStatusOnlyHandler implements Handler<ServerboundMovePlayerStatusOnlyPacket> {
    public hander(packet: ServerboundMovePlayerStatusOnlyPacket, player: Player, server: BarrierTs): void {
        server.playerManager.sendAll(
            new ClientboundTeleportEntityPacket(
                player.id,
                player.position.x,
                player.position.y,
                player.position.z,
                (player.rotation.y * 256) / 360,
                (player.rotation.x * 256) / 360,
                packet.onGround,
            ),
            player.id,
        );
        server.playerManager.sendAll(
            new ClientboundRotateHeadPacket(player.id, (player.rotation.y * 256) / 360),
            player.id,
        );
    }
}
