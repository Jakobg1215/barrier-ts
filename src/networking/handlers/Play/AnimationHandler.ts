import type Server from '../../../server';
import Packet from '../../packets/Packet';
import type AnimationPacket from '../../packets/Play/serverbound/AnimationPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class AnimationHandler implements Handler<AnimationPacket> {
    public id = PlayServerbound.Animation;

    public async handle(packet: AnimationPacket, server: Server, player: PlayerConnection) {
        const pk = new Packet();
        pk.writeVarInt(player.getID());
        if (packet.Hand === 0) {
            pk.writeUnsignedByte(0);
        } else pk.writeUnsignedByte(3);
        await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityAnimation, [player.getID()]);
    }
}
