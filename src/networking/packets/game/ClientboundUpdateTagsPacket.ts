import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundUpdateTagsPacket implements ClientboundPacket {
    public constructor(public tags: any) {}
    // TODO: Implement data for ClientboundUpdateTagsPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
