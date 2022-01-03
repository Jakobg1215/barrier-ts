import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundMoveEntityPacketPosRot from '../../packets/game/ClientboundMoveEntityPacketPosRot';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import type ServerboundMovePlayerPosRotPacket from '../../packets/game/ServerboundMovePlayerPosRotPacket';
import type Handler from '../Handler';

export default class MovePlayerPosRotHandler implements Handler<ServerboundMovePlayerPosRotPacket> {
    public hander(packet: ServerboundMovePlayerPosRotPacket, player: Player, server: BarrierTs): void {
        server.playerManager.sendAll(
            new ClientboundMoveEntityPacketPosRot(
                player.id,
                Math.min(Math.max((packet.x * 32 - player.position.x * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.y * 32 - player.position.y * 32) * 128, -32768), 32767),
                Math.min(Math.max((packet.z * 32 - player.position.z * 32) * 128, -32768), 32767),
                (packet.yRot * 256) / 360,
                (packet.xRot * 256) / 360,
                packet.onGround,
            ),
            player.id,
        );
        server.playerManager.sendAll(new ClientboundRotateHeadPacket(player.id, (packet.yRot * 256) / 360), player.id);
        player.position.setX(packet.x).setY(packet.y).setZ(packet.z);
        player.rotation.setX(packet.xRot).setY(packet.yRot);
    }
}
