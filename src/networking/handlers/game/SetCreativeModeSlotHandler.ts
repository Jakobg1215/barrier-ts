import type BarrierTs from '../../../BarrierTs';
import Slot from '../../../types/classes/Slot';
import type Player from '../../../world/entity/Player/Player';
import ClientboundSetEquipmentPacket from '../../packets/game/ClientboundSetEquipmentPacket';
import type ServerboundSetCreativeModeSlotPacket from '../../packets/game/ServerboundSetCreativeModeSlotPacket';
import type Handler from '../Handler';

export default class SetCreativeModeSlotHandler implements Handler<ServerboundSetCreativeModeSlotPacket> {
    public hander(packet: ServerboundSetCreativeModeSlotPacket, player: Player, server: BarrierTs): void {
        player.inventory.set(packet.slotNum, packet.itemStack);
        switch (packet.slotNum) {
            case 5: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 5,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
                break;
            }

            case 6: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 4,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
                break;
            }

            case 7: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 3,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
                break;
            }

            case 8: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 2,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
                break;
            }

            case 45: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 1,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
                break;
            }

            case player.heldItemSlot + 36: {
                server.playerManager.sendAll(
                    new ClientboundSetEquipmentPacket(player.id, [
                        {
                            pos: 0,
                            item: new Slot(
                                true,
                                packet.itemStack.id,
                                packet.itemStack.count,
                                Buffer.from(packet.itemStack.nbt),
                            ),
                        },
                    ]),
                    player.id,
                );
            }
        }
    }
}
