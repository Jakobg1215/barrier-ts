import type BarrierTs from '../../../BarrierTs';
import type Connection from '../../Connection';
import ClientboundStatusResponsePacket from '../../packets/status/ClientboundStatusResponsePacket';
import type ServerboundStatusRequestPacket from '../../packets/status/ServerboundStatusRequestPacket';
import type Handler from '../Handler';

export default class StatusRequestHandler implements Handler<ServerboundStatusRequestPacket> {
    public hander(_packet: ServerboundStatusRequestPacket, connection: Connection, _server: BarrierTs): void {
        connection.send(
            new ClientboundStatusResponsePacket(
                JSON.stringify({
                    version: {
                        name: '1.17.1',
                        protocol: 756,
                    },
                    players: {
                        max: 100,
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
