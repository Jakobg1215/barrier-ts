import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';
export default class ClientBoundCommandSuggestionsPacket implements ClientBoundPacket {
    public constructor(public id: number, public suggestions: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundCommandSuggestionsPacket
    }
}
