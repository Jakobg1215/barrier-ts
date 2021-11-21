import type BarrierTs from '../../../BarrierTs';
import Slot from '../../../types/classes/Slot';
import type Connection from '../../Connection';
import ClientboundSetEquipmentPacket from '../../packets/game/ClientboundSetEquipmentPacket';
import type ServerboundSetCreativeModeSlotPacket from '../../packets/game/ServerboundSetCreativeModeSlotPacket';
import type Handler from '../Handler';

export default class SetCreativeModeSlotHandler implements Handler<ServerboundSetCreativeModeSlotPacket> {
    public hander(packet: ServerboundSetCreativeModeSlotPacket, connection: Connection, server: BarrierTs): void {
        connection.player.inventory.set(packet.slotNum, packet.itemStack);
        switch (packet.slotNum) {
            case 5: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
                break;
            }
            case 6: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
                break;
            }
            case 7: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
                break;
            }
            case 8: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
                break;
            }
            case 45: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
                break;
            }
            case connection.player.heldItemSlot + 36: {
                server.brodcast(
                    new ClientboundSetEquipmentPacket(connection.player.id, [
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
                    [connection.player.id],
                );
            }
        }
    }
}
