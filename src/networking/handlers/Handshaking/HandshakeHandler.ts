import type PlayerConnection from '../../players/PlayerConnection';
import { ConnectionStates } from '../../types/ConnectionState';
import type Handler from '../Handler';
import type HandshakePacket from '../../packets/Handshaking/Serverbound/HandshakePacket';
import { HandshakingServerbound, StatusClientbound, LoginServerbound } from '../../types/PacketIds';
import ResponsePacket from '../../packets/Status/Clientbound/ResponsePacket';
import type Server from '../../../server';

export default class HandshakeHandler implements Handler<HandshakePacket> {
    public id = HandshakingServerbound.Handshake;

    public async handle(packet: HandshakePacket, server: Server, player: PlayerConnection) {
        player.setState(packet.NextState);
        if (packet.NextState === ConnectionStates.Status) {
            const pk = new ResponsePacket();
            pk.JSONResponse = JSON.stringify({
                version: {
                    name: '1.16.5',
                    protocol: 754,
                },
                players: {
                    max: 100,
                    online: server.getPlayerManager().getConnections().size - 1,
                },
                description: {
                    text: 'Hello world',
                },
            });
            await player.sendPacket(pk, StatusClientbound.Response);
        }
        if (packet.NextState === ConnectionStates.Login) {
            try {
                packet.readVarInt();
                packet.readVarInt();
                const pack = server.getNetworkRegistry().getPacket(ConnectionStates.Login, LoginServerbound.LoginStart);
                if (!pack) {
                    throw new Error('Error trying to get Login Start Packet');
                }
                const hander = server
                    .getNetworkRegistry()
                    .getHandler(ConnectionStates.Login, LoginServerbound.LoginStart);
                if (!hander) {
                    throw new Error('Error trying to get Login Start handler');
                }
                const pk = new pack(packet.getBytes().slice(packet.getOffset()));
                pk.decrypt();
                await hander.handle(pk, server, player);
            } catch {}
        }
    }
}
