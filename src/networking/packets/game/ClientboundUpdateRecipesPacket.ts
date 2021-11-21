import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundUpdateRecipesPacket implements ClientboundPacket {
    public constructor(public recipes: any) {}
    // TODO: Implement data for ClientboundUpdateRecipesPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
