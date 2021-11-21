import type ClientboundPacket from '../ClientbountPacket';
import type Packet from '../Packet';

export default class ClientboundRecipePacket implements ClientboundPacket {
    public constructor(public state: State, public recipes: any, public toHighlight: any, public bookSettings: any) {}
    // TODO: Implement data for ClientboundRecipePacket
    public write(): Packet {
        throw new Error('Method not implemented.');
    }
}

export enum State {
    INIT,
    ADD,
    REMOVE,
}
