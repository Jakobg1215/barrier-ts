import type Server from '../../../server';
import type LegacyServerListPingPacket from '../../packets/Handshaking/Serverbound/LegacyServerListPingPacket';
import Packet from '../../packets/Packet';
import type PlayerConnection from '../../players/PlayerConnection';
import { HandshakingServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';
import RequestHandler from '../Status/RequestHandler';

export default class LegacyServerListPingHandler implements Handler<LegacyServerListPingPacket> {
    public id = HandshakingServerbound.LegacyServerListPing;

    public async handle(_packet: LegacyServerListPingPacket, server: Server, player: PlayerConnection) {
        // This is probably not how to handle it but what ever
        player.setState(1);
        new RequestHandler().handle(new Packet(), server, player);
    }
}
