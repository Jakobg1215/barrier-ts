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
