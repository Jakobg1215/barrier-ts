import type BarrierTs from '../../../BarrierTs';
import type Player from '../../../world/entity/Player/Player';
import ClientboundHelloPacket from '../../packets/login/ClientboundHelloPacket';
import type ServerboundHelloPacket from '../../packets/login/ServerboundHelloPacket';
import type Handler from '../Handler';

export default class HelloHandler implements Handler<ServerboundHelloPacket> {
    public hander(packet: ServerboundHelloPacket, player: Player, server: BarrierTs): void {
        if (!server.config.online) {
            player.connection.enableCompression();
            player.playerGameProfile.name = `OfflinePlayer:${packet.gameProfile.name}`;
            player.login();
            return;
        }
        player.playerGameProfile.name = packet.gameProfile.name;
        player.connection.send(
            new ClientboundHelloPacket(
                server.config.serverId.length > 20 ? '' : server.config.serverId,
                server.playerManager.padLock.publicKey,
                player.connection.nonce,
            ),
        );
    }
}
