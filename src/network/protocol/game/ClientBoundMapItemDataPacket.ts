import type DataBuffer from '../../DataBuffer';
import type ClientBoundPacket from '../ClientBoundPacket';

export default class ClientBoundMapItemDataPacket implements ClientBoundPacket {
    public constructor(public mapId: number, public scale: number, public locked: boolean, public decorations: any, public colorPatch: any) {}

    public write(_packet: DataBuffer): DataBuffer {
        throw new Error('Method not implemented.'); // TODO: Implement data for ClientBoundMapItemDataPacket
    }
}
