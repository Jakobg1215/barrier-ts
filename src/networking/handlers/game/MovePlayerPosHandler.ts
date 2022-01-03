import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundMoveEntityPacketPos from '../../packets/game/ClientboundMoveEntityPacketPos';
import type ServerboundMovePlayerPosPacket from '../../packets/game/ServerboundMovePlayerPosPacket';
import type Handler from '../Handler';

export default class MovePlayerPosHandler implements Handler<ServerboundMovePlayerPosPacket> {
    public hander(packet: ServerboundMovePlayerPosPacket, player: Player, server: BarrierTs): void {
        server.playerManager.sendAll(
            new ClientboundMoveEntityPacketPos(
                player.id,
                Math.min(Math.max((packet.x * 32 - player.position.x * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.y * 32 - player.position.y * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.z * 32 - player.position.z * 32) * 128, -32768), 32767),
                packet.onGround,
            ),
            player.id,
        );
        player.position.setX(packet.x).setY(packet.y).setZ(packet.z);
    }
}
