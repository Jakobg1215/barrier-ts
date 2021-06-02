import type PlayerConnection from '../../players/PlayerConnection';
import type Handler from '../Handler';
import PlayerPositionPacket from '../../packets/Play/serverbound/PlayerPositionPacket';
import { PlayServerbound } from '../../types/PacketIds';
import type Server from '../../../server';
import Packet from '../../packets/Packet';

export default class PlayerPositionHandler implements Handler<PlayerPositionPacket> {
    public id = PlayServerbound.PlayerPosition;

    public handle(packet: PlayerPositionPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        const pozpk = new Packet();
        pozpk.writeVarInt(player.getID());
        try {
            pozpk.writeShort((packet.X * 32 - player.getPosition()[0] * 32) * 128);
            pozpk.writeShort((packet.FeetY * 32 - player.getPosition()[1] * 32) * 128);
            pozpk.writeShort((packet.Z * 32 - player.getPosition()[2] * 32) * 128);
        } catch {
            pozpk.writeShort(0);
            pozpk.writeShort(0);
            pozpk.writeShort(0);
        }
        pozpk.writeBoolean(packet.OnGround);
        server
            .getPlayerManager()
            .getConnections()
            .forEach(conn => {
                if (conn.getID() === player.getID()) return;
                conn.sendRaw(pozpk.buildPacket(0x27));
            });
        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
    }
}
