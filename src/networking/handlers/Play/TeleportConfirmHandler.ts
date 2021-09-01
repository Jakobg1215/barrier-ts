import type Server from '../../../server';
import EntityTeleportPacket from '../../packets/Play/clientbound/EntityTeleport';
import TeleportConfirmPacket from '../../packets/Play/serverbound/TeleportConfirmPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class TeleportConfirmHandler implements Handler<TeleportConfirmPacket> {
    public id = PlayServerbound.TeleportConfirm;

    public async handle(_packet: TeleportConfirmPacket, server: Server, player: PlayerConnection) {
        const TeleportPacket = new EntityTeleportPacket();
        TeleportPacket.EntityID = player.getID();
        TeleportPacket.X = player.getPosition().getX();
        TeleportPacket.Y = player.getPosition().getY();
        TeleportPacket.Z = player.getPosition().getZ();
        TeleportPacket.Yaw = player.getRotation().getx();
        TeleportPacket.Pitch = player.getRotation().gety();
        TeleportPacket.OnGround = player.getOnGround();
        await server.getPlayerManager().sendPacketAll(TeleportPacket, PlayClientbound.EntityTeleport, [player.getID()]);
    }
}
