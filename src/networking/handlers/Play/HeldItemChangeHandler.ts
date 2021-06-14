import type Server from '../../../server';
import Packet from '../../packets/Packet';
import type HeldItemChangePacket from '../../packets/Play/serverbound/HeldItemChangePacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class HeldItemChangeHandler implements Handler<HeldItemChangePacket> {
    public id = PlayServerbound.HeldItemChange;

    public async handle(packet: HeldItemChangePacket, server: Server, player: PlayerConnection) {
        const pk = new Packet();
        pk.writeVarInt(player.getID());
        pk.writeByte(0);
        pk.writeSlot(player.getHotBar(packet.Slot));
        await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment, [player.getID()]);
    }
}
