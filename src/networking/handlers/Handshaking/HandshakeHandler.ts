import type Server from '../../../server';
import type HandshakePacket from '../../packets/Handshaking/Serverbound/HandshakePacket';
import Packet from '../../packets/Packet';
import type PlayerConnection from '../../players/PlayerConnection';
import { ConnectionStates } from '../../types/ConnectionState';
import { HandshakingServerbound, LoginServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';
import RequestHandler from '../Status/RequestHandler';

export default class HandshakeHandler implements Handler<HandshakePacket> {
    public id = HandshakingServerbound.Handshake;

    public async handle(packet: HandshakePacket, server: Server, player: PlayerConnection) {
        player.setState(packet.NextState);
        if (packet.NextState === ConnectionStates.Status) {
            new RequestHandler().handle(new Packet(), server, player);
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
