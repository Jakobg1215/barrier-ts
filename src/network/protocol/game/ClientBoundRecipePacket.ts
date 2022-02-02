import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundRecipePacket implements ClientBoundPacket {
    public constructor(public state: State, public recipes: any, public toHighlight: any, public bookSettings: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundRecipePacket
    }
}

export enum State {
    INIT,
    ADD,
    REMOVE,
}
