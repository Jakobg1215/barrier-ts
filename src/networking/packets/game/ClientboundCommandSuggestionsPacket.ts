import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundCommandSuggestionsPacket implements ClientboundPacket {
    public constructor(public id: number, public suggestions: any) {}
    // TODO: Implement data for ClientboundCommandSuggestionsPacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}
