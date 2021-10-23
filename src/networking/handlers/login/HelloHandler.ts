import type BarrierTs from '../../../BarrierTs';
import DimensionType from '../../../types/DimensionType';
import { GameType } from '../../../types/GameType';
import RegistryHolder from '../../../types/RegistryHolder';
import ObjectToNbt from '../../../utilities/ObjectToNbt';
import type Connection from '../../Connection';
import ClientboundLoginPacket from '../../packets/game/ClientboundLoginPacket';
import ClientboundGameProfilePacket from '../../packets/login/ClientboundGameProfilePacket';
import ClientboundHelloPacket from '../../packets/login/ClientboundHelloPacket';
import ClientboundLoginCompressionPacket from '../../packets/login/ClientboundLoginCompressionPacket';
import type ServerboundHelloPacket from '../../packets/login/ServerboundHelloPacket';
import { ProtocolState } from '../../Protocol';
import type Handler from '../Handler';

export default class HelloHandler implements Handler<ServerboundHelloPacket> {
    public hander(packet: ServerboundHelloPacket, connection: Connection, server: BarrierTs): void {
        if (!server.config.online) {
            if (server.config.compression >= 0) {
                connection.send(new ClientboundLoginCompressionPacket(server.config.compression));
                connection.enableCompression();
            }
            connection.createPlayer(packet.gameProfile);
            connection.send(new ClientboundGameProfilePacket(connection.player?.gameProfile!));
            connection.setProtocolState(ProtocolState.PLAY);
            connection.send(
                new ClientboundLoginPacket(
                    0,
                    0n,
                    false,
                    GameType.CREATIVE,
                    GameType.CREATIVE,
                    ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'],
                    ObjectToNbt(RegistryHolder),
                    ObjectToNbt(DimensionType),
                    'minecraft:overworld',
                    server.config.maxplayers,
                    10,
                    false,
                    true,
                    true,
                    true,
                ),
            );
            return;
        }
        connection.setName(packet.gameProfile.name);
        connection.send(new ClientboundHelloPacket(server.config.serverId, server.padLock.publicKey, connection.nonce));
    }
}
