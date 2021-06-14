import type Server from '../../../server';
import Packet from '../../packets/Packet';
import type CreativeInventoryActionPacket from '../../packets/Play/serverbound/CreativeInventoryActionPacket';
import type PlayerConnection from '../../players/PlayerConnection';
import { PlayClientbound, PlayServerbound } from '../../types/PacketIds';
import type Handler from '../Handler';

export default class CreativeInventoryActionHandler implements Handler<CreativeInventoryActionPacket> {
    public id = PlayServerbound.CreativeInventoryAction;

    public async handle(packet: CreativeInventoryActionPacket, server: Server, player: PlayerConnection) {
        switch (packet.Slot) {
            case 36:
                player.setHotBar(0, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 0) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server
                        .getPlayerManager()
                        .sendPacketAll(pk, PlayClientbound.EntityEquipment, [player.getID()]);
                }
                break;
            case 37:
                player.setHotBar(1, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 1) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 38:
                player.setHotBar(2, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 2) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 39:
                player.setHotBar(3, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 3) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 40:
                player.setHotBar(4, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 4) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 41:
                player.setHotBar(5, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 5) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 42:
                player.setHotBar(6, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 6) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 43:
                player.setHotBar(7, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 7) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
            case 44:
                player.setHotBar(8, packet.ClickedItem);
                if (player.getSelectedHotBarSlot() === 8) {
                    const pk = new Packet();
                    pk.writeVarInt(player.getID());
                    pk.writeByte(0);
                    pk.writeSlot(packet.ClickedItem);
                    await server.getPlayerManager().sendPacketAll(pk, PlayClientbound.EntityEquipment);
                }
                break;
        }
    }
}
