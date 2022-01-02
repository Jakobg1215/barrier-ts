import type ClientboundPacket from '../ClientbountPacket';
import Packet from '../Packet';

export default class ClientboundSetEntityDataPacket implements ClientboundPacket {
    public constructor(public id: number, public packedItems: packetItem[]) {}

    public write(): Packet {
        const data = new Packet().writeVarInt(this.id);
        this.packedItems.forEach(item => {
            data.writeByte(item.index).writeVarInt(item.type);
            switch (item.type) {
                case 0: {
                    data.writeByte(item.value);
                    break;
                }

                case 1: {
                    data.writeVarInt(item.value);
                    break;
                }

                case 2: {
                    data.writeFloat(item.value);
                    break;
                }

                case 3: {
                    data.writeString(item.value);
                    break;
                }

                case 4: {
                    data.writeChat(item.value);
                    break;
                }

                case 5: {
                    if (item.value === null) {
                        data.writeBoolean(false);
                    }
                    data.writeBoolean(true).writeChat(item.value);
                    break;
                }

                case 6: {
                    data.writeSlot(item.value);
                    break;
                }

                case 7: {
                    data.writeBoolean(item.value);
                    break;
                }

                case 8: {
                    data.writeFloat(item.value[0]).writeFloat(item.value[1]).writeFloat(item.value[2]);
                    break;
                }

                case 9: {
                    data.writeBlockPos(item.value);
                    break;
                }

                case 10: {
                    if (item.value === null) {
                        data.writeBoolean(false);
                        break;
                    }
                    data.writeBoolean(true).writeBlockPos(item.value);
                    break;
                }

                case 11: {
                    data.writeVarInt(item.value);
                    break;
                }

                case 12: {
                    if (item.value === null) {
                        data.writeBoolean(false);
                        break;
                    }
                    data.writeBoolean(true).writeUUID(item.value);
                    break;
                }

                case 13: {
                    data.writeVarInt(item.value);
                    break;
                }

                case 14: {
                    data.writeNbt(item.value);
                    break;
                }

                case 15: {
                    // TODO
                    break;
                }

                case 16: {
                    data.writeVarInt(item.value[0]).writeVarInt(item.value[1]).writeVarInt(item.value[2]);
                    break;
                }

                case 17: {
                    data.writeVarInt(item.value);
                    break;
                }

                case 18: {
                    data.writeVarInt(item.value);
                    break;
                }
            }
        });
        data.writeByte(0xff);
        return data;
    }
}

interface packetItem {
    index: number;
    type: number;
    value: any;
}
