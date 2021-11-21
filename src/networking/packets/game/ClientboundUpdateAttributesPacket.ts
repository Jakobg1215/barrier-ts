import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundUpdateAttributesPacket implements ClientboundPacket {
    public constructor(public entityId: number, public attributes: any) {}
    // TODO: Implement data for ClientboundUpdateAttributesPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
