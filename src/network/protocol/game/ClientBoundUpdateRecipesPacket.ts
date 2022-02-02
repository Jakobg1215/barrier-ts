import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundUpdateRecipesPacket implements ClientBoundPacket {
    public constructor(public recipes: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundUpdateRecipesPacket
    }
}
