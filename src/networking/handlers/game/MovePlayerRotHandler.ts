import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundMoveEntityPacketRot from '../../packets/game/ClientboundMoveEntityPacketRot';
import ClientboundRotateHeadPacket from '../../packets/game/ClientboundRotateHeadPacket';
import type ServerboundMovePlayerRotPacket from '../../packets/game/ServerboundMovePlayerRotPacket';
import type Handler from '../Handler';

export default class MovePlayerRotHandler implements Handler<ServerboundMovePlayerRotPacket> {
    public hander(packet: ServerboundMovePlayerRotPacket, player: Player, server: BarrierTs): void {
        server.playerManager.sendAll(
            new ClientboundMoveEntityPacketRot(
                player.id,
                (packet.yRot * 256) / 360,
                (packet.xRot * 256) / 360,
                packet.onGround,
            ),
            player.id,
        );
        server.playerManager.sendAll(new ClientboundRotateHeadPacket(player.id, (packet.yRot * 256) / 360), player.id);
        player.rotation.setX(packet.xRot).setY(packet.yRot);
    }
}
