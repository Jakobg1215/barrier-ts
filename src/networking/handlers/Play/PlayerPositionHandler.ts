import type Server from '../../../server';
import EntityPositionPacket from '../../packets/Play/clientbound/EntityPositionPacket';
import PlayerPositionPacket from '../../packets/Play/serverbound/PlayerPositionPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerPositionHandler implements Handler<PlayerPositionPacket> {
    public id = PlayServerbound.PlayerPosition;

    public async handle(packet: PlayerPositionPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        const EntityPosition = new EntityPositionPacket();
        EntityPosition.EntityID = player.getID();

        EntityPosition.DeltaX = (packet.X * 32 - player.getPosition().getX() * 32) * 128;
        EntityPosition.DeltaY = (packet.FeetY * 32 - player.getPosition().getY() * 32) * 128;
        EntityPosition.DeltaZ = (packet.Z * 32 - player.getPosition().getZ() * 32) * 128;
        if (EntityPosition.DeltaX > 32767 || EntityPosition.DeltaX < -32767) {
            EntityPosition.DeltaX = 0;
        }
        if (EntityPosition.DeltaY > 32767 || EntityPosition.DeltaY < -32767) {
            EntityPosition.DeltaY = 0;
        }
        if (EntityPosition.DeltaZ > 32767 || EntityPosition.DeltaZ < -32767) {
            EntityPosition.DeltaZ = 0;
        }
        EntityPosition.OnGround = packet.OnGround;
        await server.getPlayerManager().sendPacketAll(EntityPosition, PlayClientbound.EntityPosition, [player.getID()]);
        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
    }
}
