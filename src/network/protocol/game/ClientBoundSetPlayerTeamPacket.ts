import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundSetPlayerTeamPacket implements ClientBoundPacket {
    public constructor(public method: number, public name: string, public players: string[], public parameters: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundSetPlayerTeamPacket
    }
}
