import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetEntityDatapacket implements ClientBoundPacket {
    public constructor(public id: number, public packedItems: packetItem[]) {}

    public write(packet: DataBuffer): DataBuffer {
        packet.writeVarInt(this.id);
        this.packedItems.forEach(item => {
            packet.writeByte(item.index);
            packet.writeVarInt(item.type);
            switch (item.type) {
                case 0: {
                    packet.writeByte(item.value);
                    break;
                }

                case 1: {
                    packet.writeVarInt(item.value);
                    break;
                }

                case 2: {
                    packet.writeFloat(item.value);
                    break;
                }

                case 3: {
                    packet.writeString(item.value);
                    break;
                }

                case 4: {
                    packet.writeChat(item.value);
                    break;
                }

                case 5: {
                    if (item.value === null) {
                        packet.writeBoolean(false);
                        break;
                    }
                    packet.writeBoolean(true);
                    packet.writeChat(item.value);
                    break;
                }

                case 6: {
                    packet.writeItem(item.value);
                    break;
                }

                case 7: {
                    packet.writeBoolean(item.value);
                    break;
                }

                case 8: {
                    packet.writeFloat(item.value[0]);
                    packet.writeFloat(item.value[1]);
                    packet.writeFloat(item.value[2]);
                    break;
                }

                case 9: {
                    packet.writeBlockPos(item.value);
                    break;
                }

                case 10: {
                    if (item.value === null) {
                        packet.writeBoolean(false);
                        break;
                    }
                    packet.writeBoolean(true);
                    packet.writeBlockPos(item.value);
                    break;
                }

                case 11: {
                    packet.writeVarInt(item.value);
                    break;
                }

                case 12: {
                    if (item.value === null) {
                        packet.writeBoolean(false);
                        break;
                    }
                    packet.writeBoolean(true);
                    packet.writeUUID(item.value);
                    break;
                }

                case 13: {
                    packet.writeVarInt(item.value);
                    break;
                }

                case 14: {
                    packet.writeNbt(item.value);
                    break;
                }

                case 15: {
                    // TODO: Do Particle type
                    break;
                }

                case 16: {
                    packet.writeVarInt(item.value[0]);
                    packet.writeVarInt(item.value[1]);
                    packet.writeVarInt(item.value[2]);
                    break;
                }

                case 17: {
                    packet.writeVarInt(item.value);
                    break;
                }

                case 18: {
                    packet.writeVarInt(item.value);
                    break;
                }
            }
        });
        packet.writeByte(0xff);
        return packet;
    }
}

interface packetItem {
    index: number;
    type: number;
    value: any;
}
