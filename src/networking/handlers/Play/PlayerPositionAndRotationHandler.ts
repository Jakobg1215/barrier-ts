import type Server from '../../../server';
import EntityHeadLookPacket from '../../packets/Play/clientbound/EntityHeadLookPacket';
import EntityPositionandRotationPacket from '../../packets/Play/clientbound/EntityPositionAndRotationPacket';
import PlayerPositionAndRotationPacket from '../../packets/Play/serverbound/PlayerPositionAndRotationPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerPositionAndRotationHandler implements Handler<PlayerPositionAndRotationPacket> {
    public id = PlayServerbound.PlayerPositionAndRotation;

    public async handle(packet: PlayerPositionAndRotationPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        let yaw = Math.round(
            ((Math.round(packet.Yaw) / 360 - Math.floor(Math.round(packet.Yaw) / 360)) * 360) / (360 / 255),
        );
        if (yaw < 0) yaw = 255 + yaw;
        const pitch = packet.Pitch > 0 ? (packet.Pitch * 64) / 90 : 255 - (Math.abs(packet.Pitch) * 63) / 90;
        player.setRotation({ yaw: yaw, pitch: pitch });
        const EntityPositionandRotation = new EntityPositionandRotationPacket();
        const EntityHeadLook = new EntityHeadLookPacket();
        EntityHeadLook.EntityID = player.getID();
        EntityHeadLook.HeadYaw = yaw;
        EntityPositionandRotation.EntityID = player.getID();
        EntityPositionandRotation.DeltaX = (packet.X * 32 - player.getPosition().getX() * 32) * 128;
        EntityPositionandRotation.DeltaY = (packet.FeetY * 32 - player.getPosition().getY() * 32) * 128;
        EntityPositionandRotation.DeltaZ = (packet.Z * 32 - player.getPosition().getZ() * 32) * 128;
        if (EntityPositionandRotation.DeltaX > 32767 || EntityPositionandRotation.DeltaX < -32767) {
            EntityPositionandRotation.DeltaX = 0;
        }
        if (EntityPositionandRotation.DeltaY > 32767 || EntityPositionandRotation.DeltaY < -32767) {
            EntityPositionandRotation.DeltaY = 0;
        }
        if (EntityPositionandRotation.DeltaZ > 32767 || EntityPositionandRotation.DeltaZ < -32767) {
            EntityPositionandRotation.DeltaZ = 0;
        }
        EntityPositionandRotation.Yaw = yaw;
        EntityPositionandRotation.Pitch = pitch;
        EntityPositionandRotation.OnGround = packet.OnGround;
        await server
            .getPlayerManager()
            .sendPacketAll(EntityPositionandRotation, PlayClientbound.EntityPositionAndRotation, [player.getID()]);
        await server.getPlayerManager().sendPacketAll(EntityHeadLook, PlayClientbound.EntityHeadLook, [player.getID()]);

        player.setPosition({ X: packet.X, Y: packet.FeetY, Z: packet.Z });
    }
}
