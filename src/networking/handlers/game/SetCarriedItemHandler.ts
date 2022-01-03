import type BarrierTs from '../../../BarrierTs';
import Slot from '../../../types/classes/Slot';
import type Player from '../../../world/entity/Player/Player';
import ClientboundSetEquipmentPacket from '../../packets/game/ClientboundSetEquipmentPacket';
import type ServerboundSetCarriedItemPacket from '../../packets/game/ServerboundSetCarriedItemPacket';
import type Handler from '../Handler';

export default class SetCarriedItemHandler implements Handler<ServerboundSetCarriedItemPacket> {
    public hander(packet: ServerboundSetCarriedItemPacket, player: Player, server: BarrierTs): void {
        player.heldItemSlot = packet.slot;
        server.playerManager.sendAll(
            new ClientboundSetEquipmentPacket(player.id, [
                { pos: 0, item: player.inventory.get(packet.slot + 36) ?? Slot.Empty },
            ]),
            player.id,
        );
    }
}
