import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundHelloPacket from '../../packets/login/ClientboundHelloPacket';
import ClientboundLoginCompressionPacket from '../../packets/login/ClientboundLoginCompressionPacket';
import type ServerboundHelloPacket from '../../packets/login/ServerboundHelloPacket';
import type Handler from '../Handler';

export default class HelloHandler implements Handler<ServerboundHelloPacket> {
    public hander(packet: ServerboundHelloPacket, connection: Connection, server: BarrierTs): void {
        if (!server.config.online) {
            if (server.config.compression >= 0) {
                connection.send(new ClientboundLoginCompressionPacket(server.config.compression));
                connection.enableCompression();
            }
            connection.createPlayer(packet.gameProfile);
            return connection.login();
        }
        connection.setName(packet.gameProfile.name);
        connection.send(
            new ClientboundHelloPacket(
                server.config.serverId.length > 20 ? '' : server.config.serverId,
                server.padLock.publicKey,
                connection.nonce,
            ),
        );
    }
}
