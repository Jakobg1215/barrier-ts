import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundSetEntityDataPacket implements ClientboundPacket {
    public constructor(public id: number, public packedItems: any) {}
    // TODO: Implement data for ClientboundSetEntityDataPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
