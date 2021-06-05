import type Server from '../../../server';
import EntityTeleportPacket from '../../packets/Play/clientbound/EntityTeleport';
import PlayerMovementPacket from '../../packets/Play/serverbound/PlayerMovementpacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerMovementHandler implements Handler<PlayerMovementPacket> {
    public id = PlayServerbound.PlayerMovement;

    public async handle(packet: PlayerMovementPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        const TeleportPacket = new EntityTeleportPacket();
        TeleportPacket.EntityID = player.getID();
        TeleportPacket.X = player.getPosition().getX();
        TeleportPacket.Y = player.getPosition().getY();
        TeleportPacket.Z = player.getPosition().getZ();
        TeleportPacket.Yaw = player.getRotation().getYaw();
        TeleportPacket.Pitch = player.getRotation().getPitch();
        TeleportPacket.OnGround = packet.OnGround;
        await server.getPlayerManager().sendPacketAll(TeleportPacket, PlayClientbound.EntityTeleport, [player.getID()]);
    }
}
