import type Server from '../../../server';
import PongPacket from '../../packets/Status/Clientbound/PongPacket';
import type PingPacket from '../../packets/Status/Serverbound/PingPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { StatusClientbound, StatusServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PingHandler implements Handler<PingPacket> {
    public id = StatusServerbound.Ping;

    public async handle(packet: PingPacket, _server: Server, player: PlayerConnection) {
        const pk = new PongPacket();
        pk.Payload = packet.Payload;
        await player.sendPacket(pk, StatusClientbound.Pong);
    }
}
