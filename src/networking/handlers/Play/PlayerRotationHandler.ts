import type Server from '../../../server';
import EntityHeadLookPacket from '../../packets/Play/clientbound/EntityHeadLookPacket';
import EntityRotationPacket from '../../packets/Play/clientbound/EntityRotationPacket';
import PlayerRotationPacket from '../../packets/Play/serverbound/PlayerRotationPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class PlayerRotationHandler implements Handler<PlayerRotationPacket> {
    public id = PlayServerbound.PlayerRotation;

    public async handle(packet: PlayerRotationPacket, server: Server, player: PlayerConnection) {
        player.setOnGround(packet.OnGround);
        let yaw = Math.round(
            ((Math.round(packet.Yaw) / 360 - Math.floor(Math.round(packet.Yaw) / 360)) * 360) / (360 / 255),
        );
        if (yaw < 0) yaw = 255 + yaw;
        const pitch = packet.Pitch > 0 ? (packet.Pitch * 64) / 90 : 255 - (Math.abs(packet.Pitch) * 63) / 90;
        player.setRotation({ yaw: yaw, pitch: pitch });
        const EntityRotation = new EntityRotationPacket();
        const EntityHeadLook = new EntityHeadLookPacket();
        EntityHeadLook.EntityID = player.getID();
        EntityHeadLook.HeadYaw = yaw;
        EntityRotation.EntityID = player.getID();
        EntityRotation.Yaw = yaw;
        EntityRotation.Pitch = pitch;
        EntityRotation.OnGround = packet.OnGround;
        await server.getPlayerManager().sendPacketAll(EntityRotation, PlayClientbound.EntityRotation, [player.getID()]);
        await server.getPlayerManager().sendPacketAll(EntityHeadLook, PlayClientbound.EntityHeadLook, [player.getID()]);
    }
}
