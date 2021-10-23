import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundStatusResponsePacket from '../../packets/status/ClientboundStatusResponsePacket';
import type ServerboundStatusRequestPacket from '../../packets/status/ServerboundStatusRequestPacket';
import type Handler from '../Handler';

export default class StatusRequestHandler implements Handler<ServerboundStatusRequestPacket> {
    public hander(_packet: ServerboundStatusRequestPacket, connection: Connection, server: BarrierTs): void {
        connection.send(
            new ClientboundStatusResponsePacket(
                JSON.stringify({
                    version: {
                        name: server.minecraftVersion.version,
                        protocol: server.minecraftVersion.protocol,
                    },
                    players: {
                        max: server.config.maxplayers,
                        online: 5,
                    },
                    description: {
                        text: 'Hello world',
                    },
                }),
            ),
        );
    }
}
