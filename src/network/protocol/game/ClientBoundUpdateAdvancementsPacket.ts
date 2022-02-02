import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundUpdateAdvancementsPacket implements ClientBoundPacket {
    public constructor(public reset: boolean, public added: any, public removed: any, public progress: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundUpdateAdvancementsPacket
    }
}
