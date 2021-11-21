import type BarrierTs from '../../../BarrierTs';
import Slot from '../../../types/classes/Slot';
import type Connection from '../../Connection';
import ClientboundSetEquipmentPacket from '../../packets/game/ClientboundSetEquipmentPacket';
import type ServerboundSetCarriedItemPacket from '../../packets/game/ServerboundSetCarriedItemPacket';
import type Handler from '../Handler';

export default class SetCarriedItemHandler implements Handler<ServerboundSetCarriedItemPacket> {
    public hander(packet: ServerboundSetCarriedItemPacket, connection: Connection, server: BarrierTs): void {
        connection.player.heldItemSlot = packet.slot;
        server.brodcast(
            new ClientboundSetEquipmentPacket(connection.player.id, [
                { pos: 0, item: connection.player.inventory.get(packet.slot + 36) ?? Slot.Empty },
            ]),
            [connection.player.id],
        );
    }
}
